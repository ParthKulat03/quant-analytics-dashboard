import time
from backend.config import BINANCE_SYMBOLS
from backend.analytics.resampler import resample_ticks, store_bars


def start_resampling_loop():
    while True:
        for symbol in BINANCE_SYMBOLS:
            bars_1s = resample_ticks(symbol, "1s", 1)
            bars_1m = resample_ticks(symbol, "1m", 60)
            bars_5m = resample_ticks(symbol, "5m", 300)

            if bars_1s:
                store_bars(symbol, "1s", bars_1s)
            if bars_1m:
                store_bars(symbol, "1m", bars_1m)
            if bars_5m:
                store_bars(symbol, "5m", bars_5m)

        time.sleep(1)
