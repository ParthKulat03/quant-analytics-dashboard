from flask import Flask, jsonify
from flask_cors import CORS

# from config import FLASK_PORT, FLASK_ENV
from backend.config import FLASK_PORT, FLASK_ENV
from backend.ingestion.binance_ws import start_binance_ws

import threading
from backend.analytics.scheduler import start_resampling_loop

from backend.api.market import market_api

from backend.api.analytics import analytics_api

from backend.alerts.scheduler import start_alert_engine

from backend.api.alerts import alerts_api

from backend.api.overview import overview_api

from backend.api.overview import overview_api


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route("/health", methods=["GET"])
    def health():
        return jsonify({
            "status": "ok",
            "env": FLASK_ENV
        })
    
    app.register_blueprint(market_api)
    app.register_blueprint(analytics_api)
    app.register_blueprint(alerts_api)
    app.register_blueprint(overview_api)

    return app


if __name__ == "__main__":
    app = create_app()

    # 🔥 Start Binance ingestion in background
    start_binance_ws()

    threading.Thread(
        target=start_resampling_loop,
        daemon=True
    ).start()

    threading.Thread(
        target=start_alert_engine,
        daemon=True
    ).start()

    app.run(
        host="127.0.0.1",
        port=FLASK_PORT,
        debug=(FLASK_ENV == "development"),
        use_reloader=False,
    )


