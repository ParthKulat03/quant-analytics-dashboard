import json
import time
from datetime import datetime

from backend.storage.redis_buffer import redis_client
from backend.analytics.zscore import compute_zscore
from backend.analytics.spread import compute_spread
from backend.analytics.hedge_ratio import compute_hedge_ratio


COOLDOWN_SECONDS = 60  # prevent alert spam


def evaluate_alerts():
    configs = redis_client.lrange("alerts:config", 0, -1)

    for raw in configs:
        config = json.loads(raw)

        if not config.get("enabled"):
            continue

        symbol_y = config["symbol_y"]
        symbol_x = config["symbol_x"]
        tf = config.get("tf", "1m")

        y_bars = redis_client.lrange(f"bars:{symbol_y}:{tf}", 0, -1)
        x_bars = redis_client.lrange(f"bars:{symbol_x}:{tf}", 0, -1)

        if len(y_bars) < 30 or len(x_bars) < 30:
            continue

        y_prices = [json.loads(b)["close"] for b in y_bars]
        x_prices = [json.loads(b)["close"] for b in x_bars]

        hedge = compute_hedge_ratio(y_prices, x_prices)
        spread = compute_spread(y_prices, x_prices, hedge)
        zscore = compute_zscore(spread)

        triggered = False
        value = None

        if config["type"] == "zscore":
            value = zscore
            triggered = abs(zscore) > config["threshold"]

        elif config["type"] == "spread":
            value = spread[-1]
            triggered = abs(value) > config["threshold"]

        if triggered:
            _emit_alert(config, value)



def _emit_alert(config, value):
    alert_id = config["id"]
    now = int(time.time())

    last = redis_client.get(f"alerts:last:{alert_id}")
    if last and now - int(last) < COOLDOWN_SECONDS:
        return

    alert = {
        "id": alert_id,
        "type": config["type"],
        "value": float(value),
        "symbol": f'{config["symbol_y"]}/{config["symbol_x"]}',
        "timestamp": datetime.utcnow().isoformat()
    }

    redis_client.rpush("alerts:history", json.dumps(alert))
    redis_client.ltrim("alerts:history", -1000, -1)

    redis_client.set(f"alerts:last:{alert_id}", now)
