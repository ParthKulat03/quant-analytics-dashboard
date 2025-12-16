from backend.storage.redis_buffer import redis_client

print(redis_client.lrange("ticks:BTCUSDT", -3, -1))
