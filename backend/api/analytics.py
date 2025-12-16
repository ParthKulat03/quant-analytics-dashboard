import json
from flask import Blueprint, request, jsonify

from backend.storage.redis_buffer import redis_client
from backend.analytics.hedge_ratio import compute_hedge_ratio
from backend.analytics.spread import compute_spread
from backend.analytics.zscore import compute_zscore
from backend.analytics.correlation import compute_correlation
from backend.analytics.adf import compute_adf

analytics_api = Blueprint("analytics_api", __name__)


@analytics_api.route("/api/analytics/spread-zscore", methods=["GET"])
def spread_zscore():
    symbol_y = request.args.get("y", "ETHUSDT")
    symbol_x = request.args.get("x", "BTCUSDT")
    tf = request.args.get("tf", "1m")

    y_bars = redis_client.lrange(f"bars:{symbol_y}:{tf}", 0, -1)
    x_bars = redis_client.lrange(f"bars:{symbol_x}:{tf}", 0, -1)

    y_prices = [json.loads(b)["close"] for b in y_bars]
    x_prices = [json.loads(b)["close"] for b in x_bars]

    if len(y_prices) < 30 or len(x_prices) < 30:
        return jsonify({"error": "Not enough data"}), 400

    hedge = compute_hedge_ratio(y_prices, x_prices)
    spread = compute_spread(y_prices, x_prices, hedge)
    z = compute_zscore(spread)

    return jsonify({
        "hedge_ratio": hedge,
        "latest_spread": float(spread[-1]),
        "zscore": z
    })



@analytics_api.route("/api/analytics/correlation", methods=["GET"])
def correlation():
    symbol_y = request.args.get("y", "ETHUSDT")
    symbol_x = request.args.get("x", "BTCUSDT")
    tf = request.args.get("tf", "1m")

    y_bars = redis_client.lrange(f"bars:{symbol_y}:{tf}", 0, -1)
    x_bars = redis_client.lrange(f"bars:{symbol_x}:{tf}", 0, -1)

    y_prices = [json.loads(b)["close"] for b in y_bars]
    x_prices = [json.loads(b)["close"] for b in x_bars]

    corr = compute_correlation(x_prices, y_prices)

    return jsonify({
        "correlation": corr
    })



@analytics_api.route("/api/analytics/adf", methods=["GET"])
def adf_test():
    symbol = request.args.get("symbol", "ETHUSDT")
    tf = request.args.get("tf", "1m")

    bars = redis_client.lrange(f"bars:{symbol}:{tf}", 0, -1)
    prices = [json.loads(b)["close"] for b in bars]

    result = compute_adf(prices)

    return jsonify(result)
