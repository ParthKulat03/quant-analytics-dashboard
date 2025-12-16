import json
from backend.storage.redis_buffer import redis_client

alert_config = {
    "id": "eth_btc_zscore",
    "type": "zscore",
    "symbol_y": "ETHUSDT",
    "symbol_x": "BTCUSDT",
    "threshold": 2.0,
    "enabled": True,
    "tf": "1m"
}

redis_client.rpush("alerts:config", json.dumps(alert_config))

print("✅ Test alert seeded successfully")
