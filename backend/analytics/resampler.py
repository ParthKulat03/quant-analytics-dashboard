import json
from datetime import datetime
from collections import defaultdict

from backend.storage.redis_buffer import redis_client


def floor_time(ts: datetime, seconds: int) -> datetime:
    return datetime.fromtimestamp(
        int(ts.timestamp() // seconds * seconds)
    )


def resample_ticks(symbol: str, timeframe: str, window_seconds: int):
    """
    Convert ticks → OHLCV bars for a given timeframe
    """
    redis_key = f"ticks:{symbol}"
    raw_ticks = redis_client.lrange(redis_key, 0, -1)

    if not raw_ticks:
        return None

    buckets = defaultdict(list)

    for raw in raw_ticks:
        tick = json.loads(raw)
        ts = datetime.fromisoformat(tick["timestamp"])
        bucket_ts = floor_time(ts, window_seconds)

        buckets[bucket_ts].append(tick)

    bars = []

    for bucket_ts, ticks in buckets.items():
        prices = [t["price"] for t in ticks]
        sizes = [t["size"] for t in ticks]

        bar = {
            "symbol": symbol,
            "ts": bucket_ts.isoformat(),
            "open": prices[0],
            "high": max(prices),
            "low": min(prices),
            "close": prices[-1],
            "volume": sum(sizes),
            "tf": timeframe,
        }
        bars.append(bar)

    bars.sort(key=lambda x: x["ts"])
    return bars


def store_bars(symbol: str, timeframe: str, bars: list):
    redis_key = f"bars:{symbol}:{timeframe}"

    redis_client.delete(redis_key)

    for bar in bars:
        redis_client.rpush(redis_key, json.dumps(bar))

    # keep last N bars only
    redis_client.ltrim(redis_key, -1000, -1)
