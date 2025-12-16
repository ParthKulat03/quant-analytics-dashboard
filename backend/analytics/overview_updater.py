import json
from datetime import datetime
from backend.storage.redis_buffer import redis_client

def update_overview(
    priceA,
    priceB,
    spread,
    zscore,
    hedge_ratio,
    adf_pvalue,
    correlation
):
    point = {
        "timestamp": datetime.now().strftime("%H:%M:%S"),
        "priceA": round(priceA, 2),
        "priceB": round(priceB, 2),
        "spread": round(spread, 2),
        "zScore": round(zscore, 3),
    }

    redis_client.rpush("overview:series", json.dumps(point))
    redis_client.ltrim("overview:series", -200, -1)

    redis_client.set(
        "overview:metrics",
        json.dumps({
            "hedge_ratio": round(hedge_ratio, 4),
            "adf_pvalue": round(adf_pvalue, 4),
            "correlation": round(correlation, 4),
            "stationary": adf_pvalue < 0.05
        })
    )
