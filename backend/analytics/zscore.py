import numpy as np

def compute_zscore(spread, window=30):
    spread = np.array(spread)

    if len(spread) < window:
        return None

    mean = spread[-window:].mean()
    std = spread[-window:].std()

    if std == 0:
        return 0.0

    return (spread[-1] - mean) / std
