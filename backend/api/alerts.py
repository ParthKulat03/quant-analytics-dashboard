# import json
# from flask import Blueprint, request, jsonify
# from backend.storage.redis_buffer import redis_client

# alerts_api = Blueprint("alerts_api", __name__)


# @alerts_api.route("/api/alerts/config", methods=["GET"])
# def get_alerts():
#     configs = redis_client.lrange("alerts:config", 0, -1)
#     return jsonify([json.loads(c) for c in configs])



# @alerts_api.route("/api/alerts/config", methods=["POST"])
# def add_alert():
#     data = request.json
#     redis_client.rpush("alerts:config", json.dumps(data))
#     return jsonify({"status": "added"})



# @alerts_api.route("/api/alerts/history", methods=["GET"])
# def alert_history():
#     alerts = redis_client.lrange("alerts:history", -100, -1)
#     return jsonify([json.loads(a) for a in alerts])













import json
from flask import Blueprint, request, jsonify, make_response
from backend.storage.redis_buffer import redis_client

alerts_api = Blueprint("alerts_api", __name__)


def safe_json_load(value):
    """
    Handles both bytes and str returned from Redis
    """
    if isinstance(value, bytes):
        value = value.decode("utf-8")
    return json.loads(value)


@alerts_api.route("/api/alerts/config", methods=["GET"])
def get_alerts():
    configs = redis_client.lrange("alerts:config", 0, -1)
    data = [safe_json_load(c) for c in configs]

    response = make_response(jsonify(data))
    response.headers["Cache-Control"] = "no-store"
    return response


@alerts_api.route("/api/alerts/config", methods=["POST"])
def add_alert():
    data = request.json
    redis_client.rpush("alerts:config", json.dumps(data))
    return jsonify({"status": "added"})


@alerts_api.route("/api/alerts/config/<alert_id>", methods=["DELETE"])
def delete_alert(alert_id):
    configs = redis_client.lrange("alerts:config", 0, -1)
    redis_client.delete("alerts:config")

    for c in configs:
        alert = json.loads(c)
        if alert["id"] != alert_id:
            redis_client.rpush("alerts:config", json.dumps(alert))

    return jsonify({"status": "deleted"})


@alerts_api.route("/api/alerts/history", methods=["GET"])
def alert_history():
    alerts = redis_client.lrange("alerts:history", -100, -1)
    data = [safe_json_load(a) for a in alerts]

    response = make_response(jsonify(data))
    response.headers["Cache-Control"] = "no-store"
    return response
