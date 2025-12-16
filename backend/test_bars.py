from backend.storage.redis_buffer import redis_client

bars = redis_client.lrange("bars:BTCUSDT:1m", -3, -1)

print("Last 3 BTCUSDT 1m bars:")
for bar in bars:
    print(bar)
