from flask import Blueprint, jsonify
from backend.storage.redis_buffer import redis_client
import json

overview_api = Blueprint("overview_api", __name__)

# ----------------------------------
# GET /api/overview/metrics
# ----------------------------------
@overview_api.route("/api/overview/metrics", methods=["GET"])
def get_overview_metrics():
    """
    Returns latest statistical metrics for dashboard
    """
    data = redis_client.get("overview:metrics")

    if not data:
        # Fallback default values
        return jsonify({
            "hedge_ratio": 0.0,
            "adf_pvalue": 1.0,
            "correlation": 0.0,
            "stationary": False
        })

    return jsonify(json.loads(data))


# ----------------------------------
# GET /api/overview/series
# ----------------------------------
@overview_api.route("/api/overview/series", methods=["GET"])
def get_overview_series():
    """
    Returns rolling time-series data for charts
    """
    series = redis_client.lrange("overview:series", -200, -1)

    return jsonify([json.loads(x) for x in series])




@overview_api.route("/api/overview/orderbook/<symbol>")
def get_orderbook(symbol):
    raw = redis_client.get(f"orderbook:{symbol.upper()}")
    if not raw:
        return jsonify({"bids": [], "asks": []})
    return jsonify(json.loads(raw))