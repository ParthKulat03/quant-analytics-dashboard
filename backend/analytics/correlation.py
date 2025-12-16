import numpy as np

def compute_correlation(x_prices, y_prices, window=30):
    if len(x_prices) < window:
        return None

    return np.corrcoef(
        x_prices[-window:],
        y_prices[-window:]
    )[0, 1]
