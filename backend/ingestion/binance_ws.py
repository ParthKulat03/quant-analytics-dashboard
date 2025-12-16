# import json
# import threading
# import websocket
# from datetime import datetime

# from backend.config import BINANCE_SYMBOLS
# from backend.storage.redis_buffer import redis_client

# from backend.analytics.overview_updater import update_overview


# BINANCE_WS_BASE = "wss://fstream.binance.com/ws"


# def normalize_trade(event: dict) -> dict:
#     """
#     Normalize Binance trade event to internal tick format
#     """
#     return {
#         "symbol": event["s"],
#         "timestamp": datetime.utcfromtimestamp(event["T"] / 1000).isoformat(),
#         "price": float(event["p"]),
#         "size": float(event["q"]),
#     }


# # def on_message(ws, message):
# #     try:
# #         data = json.loads(message)
# #         if data.get("e") != "trade":
# #             return

# #         tick = normalize_trade(data)

# #         redis_key = f"ticks:{tick['symbol']}"

# #         # Push tick to Redis list
# #         redis_client.rpush(redis_key, json.dumps(tick))

# #         # Trim list to last N ticks (rolling buffer)
# #         redis_client.ltrim(redis_key, -10000, -1)

# #     except Exception as e:
# #         print("WS message error:", e)



# def on_message(ws, message):
#     try:
#         data = json.loads(message)

#         # Only process trade events
#         if data.get("e") != "trade":
#             return

#         # Normalize trade
#         tick = normalize_trade(data)
#         symbol = tick["symbol"]
#         price = tick["price"]

#         # 1️⃣ Store raw ticks (unchanged behavior)
#         redis_key = f"ticks:{symbol}"
#         redis_client.rpush(redis_key, json.dumps(tick))
#         redis_client.ltrim(redis_key, -10000, -1)

#         # 2️⃣ Only proceed if BOTH symbols exist (BTC + ETH)
#         if symbol not in ("BTCUSDT", "ETHUSDT"):
#             return

#         btc_ticks = redis_client.lrange("ticks:BTCUSDT", -200, -1)
#         eth_ticks = redis_client.lrange("ticks:ETHUSDT", -200, -1)

#         if len(btc_ticks) < 50 or len(eth_ticks) < 50:
#             return  # not enough data yet

#         # 3️⃣ Convert to price arrays
#         btc_prices = [json.loads(t)["price"] for t in btc_ticks]
#         eth_prices = [json.loads(t)["price"] for t in eth_ticks]

#         priceA = eth_prices[-1]
#         priceB = btc_prices[-1]

#         # 4️⃣ Compute analytics (simple but correct)
#         hedge_ratio = sum(eth_prices) / sum(btc_prices)

#         spread_series = [
#             eth_prices[i] - hedge_ratio * btc_prices[i]
#             for i in range(min(len(eth_prices), len(btc_prices)))
#         ]

#         mean_spread = sum(spread_series) / len(spread_series)
#         std_spread = (sum((x - mean_spread) ** 2 for x in spread_series) / len(spread_series)) ** 0.5

#         if std_spread == 0:
#             return

#         spread = spread_series[-1]
#         zscore = (spread - mean_spread) / std_spread

#         # Placeholder stats (can be upgraded later)
#         adf_pvalue = 0.03
#         correlation = 0.92

#         # 5️⃣ Update OVERVIEW (Dashboard + Alerts)
#         update_overview(
#             priceA=priceA,
#             priceB=priceB,
#             spread=spread,
#             zscore=zscore,
#             hedge_ratio=hedge_ratio,
#             adf_pvalue=adf_pvalue,
#             correlation=correlation,
#         )

#     except Exception as e:
#         print("WS message error:", e)




# def on_depth_message(ws, message):
#     data = json.loads(message)

#     # DEBUG: print event type
#     print("WS EVENT:", data.get("e"), "keys:", data.keys())

#     # DEPTH EVENT
#     if "b" in data and "a" in data:
#         print("DEPTH UPDATE RECEIVED")

#         symbol = data["s"]
#         bids = data["b"]
#         asks = data["a"]

#         redis_client.set(
#             f"orderbook:{symbol}",
#             json.dumps({
#                 "bids": bids[:20],
#                 "asks": asks[:20]
#             })
#         )
#         return

#     # TRADE EVENT
#     if data.get("e") == "trade":
#         pass




# def on_error(ws, error):
#     print("WebSocket error:", error)


# def on_close(ws, close_status_code, close_msg):
#     print("WebSocket closed:", close_status_code, close_msg)


# def on_open(ws):
#     print("WebSocket connection opened")


# def start_symbol_stream(symbol: str):
#     url = f"{BINANCE_WS_BASE}/{symbol.lower()}@trade"
#     ws = websocket.WebSocketApp(
#         url,
#         on_open=on_open,
#         on_message=on_message,
#         on_error=on_error,
#         on_close=on_close,
#     )
#     ws.run_forever()


# def start_binance_ws():
#     """
#     Start WS streams for all configured symbols in background threads
#     """
#     for symbol in BINANCE_SYMBOLS:
#         thread = threading.Thread(
#             target=start_symbol_stream,
#             args=(symbol,),
#             daemon=True,
#         )
#         thread.start()

#     print(f"Started Binance WS for symbols: {BINANCE_SYMBOLS}")












import json
import threading
import websocket
from datetime import datetime

from backend.config import BINANCE_SYMBOLS
from backend.storage.redis_buffer import redis_client
from backend.analytics.overview_updater import update_overview

# Binance Futures combined stream base
BINANCE_WS_BASE = "wss://fstream.binance.com/stream"


def normalize_trade(event: dict) -> dict:
    """
    Normalize Binance trade event to internal tick format
    """
    return {
        "symbol": event["s"],
        "timestamp": datetime.utcfromtimestamp(event["T"] / 1000).isoformat(),
        "price": float(event["p"]),
        "size": float(event["q"]),
    }


def on_message(ws, message):
    try:
        msg = json.loads(message)
        data = msg.get("data", {})

        # =========================
        # ORDER BOOK (DEPTH STREAM)
        # =========================
        if "b" in data and "a" in data:
            symbol = data["s"]

            redis_client.set(
                f"orderbook:{symbol}",
                json.dumps({
                    "bids": data["b"][:20],  # top 20 bids
                    "asks": data["a"][:20],  # top 20 asks
                })
            )
            return

        # =========================
        # TRADE STREAM
        # =========================
        if data.get("e") != "trade":
            return

        tick = normalize_trade(data)
        symbol = tick["symbol"]

        # Store raw ticks
        redis_key = f"ticks:{symbol}"
        redis_client.rpush(redis_key, json.dumps(tick))
        redis_client.ltrim(redis_key, -10000, -1)

        # Only compute analytics for BTC + ETH
        if symbol not in ("BTCUSDT", "ETHUSDT"):
            return

        btc_ticks = redis_client.lrange("ticks:BTCUSDT", -200, -1)
        eth_ticks = redis_client.lrange("ticks:ETHUSDT", -200, -1)

        if len(btc_ticks) < 50 or len(eth_ticks) < 50:
            return

        btc_prices = [json.loads(t)["price"] for t in btc_ticks]
        eth_prices = [json.loads(t)["price"] for t in eth_ticks]

        priceA = eth_prices[-1]
        priceB = btc_prices[-1]

        # Simple hedge ratio
        hedge_ratio = sum(eth_prices) / sum(btc_prices)

        spread_series = [
            eth_prices[i] - hedge_ratio * btc_prices[i]
            for i in range(min(len(eth_prices), len(btc_prices)))
        ]

        mean_spread = sum(spread_series) / len(spread_series)
        std_spread = (
            sum((x - mean_spread) ** 2 for x in spread_series) / len(spread_series)
        ) ** 0.5

        if std_spread == 0:
            return

        spread = spread_series[-1]
        zscore = (spread - mean_spread) / std_spread

        # Placeholder analytics (can upgrade later)
        adf_pvalue = 0.03
        correlation = 0.92

        # Update dashboard + alerts
        update_overview(
            priceA=priceA,
            priceB=priceB,
            spread=spread,
            zscore=zscore,
            hedge_ratio=hedge_ratio,
            adf_pvalue=adf_pvalue,
            correlation=correlation,
        )

    except Exception as e:
        print("WS message error:", e)


def on_error(ws, error):
    print("WebSocket error:", error)


def on_close(ws, close_status_code, close_msg):
    print("WebSocket closed:", close_status_code, close_msg)


def on_open(ws):
    print("WebSocket connection opened")


def start_symbol_stream(symbol: str):
    """
    Start combined TRADE + DEPTH stream for a symbol
    """
    streams = f"{symbol.lower()}@trade/{symbol.lower()}@depth@100ms"
    url = f"{BINANCE_WS_BASE}?streams={streams}"

    ws = websocket.WebSocketApp(
        url,
        on_open=on_open,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
    )
    ws.run_forever()


def start_binance_ws():
    """
    Start WS streams for all configured symbols
    """
    for symbol in BINANCE_SYMBOLS:
        thread = threading.Thread(
            target=start_symbol_stream,
            args=(symbol,),
            daemon=True,
        )
        thread.start()

    print(f"Started Binance WS for symbols: {BINANCE_SYMBOLS}")
