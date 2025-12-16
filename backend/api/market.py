import json
from flask import Blueprint, request, jsonify

from backend.storage.redis_buffer import redis_client

market_api = Blueprint("market_api", __name__)



@market_api.route("/api/symbols", methods=["GET"])
def get_symbols():
    keys = redis_client.keys("ticks:*")
    symbols = [k.split(":")[1] for k in keys]
    return jsonify({"symbols": symbols})



@market_api.route("/api/bars", methods=["GET"])
def get_bars():
    symbol = request.args.get("symbol")
    tf = request.args.get("tf", "1m")
    limit = int(request.args.get("limit", 200))

    if not symbol:
        return jsonify({"error": "symbol required"}), 400

    redis_key = f"bars:{symbol}:{tf}"
    raw_bars = redis_client.lrange(redis_key, -limit, -1)

    bars = [json.loads(b) for b in raw_bars]

    return jsonify({
        "symbol": symbol,
        "timeframe": tf,
        "bars": bars
    })



@market_api.route("/api/latest-price", methods=["GET"])
def get_latest_price():
    symbol = request.args.get("symbol")

    if not symbol:
        return jsonify({"error": "symbol required"}), 400

    redis_key = f"ticks:{symbol}"
    tick = redis_client.lrange(redis_key, -1, -1)

    if not tick:
        return jsonify({"price": None})

    tick = json.loads(tick[0])

    return jsonify({
        "symbol": symbol,
        "price": tick["price"],
        "timestamp": tick["timestamp"]
    })

