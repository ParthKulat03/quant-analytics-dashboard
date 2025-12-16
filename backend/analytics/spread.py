import numpy as np

def compute_spread(y_prices, x_prices, hedge_ratio):
    return np.array(y_prices) - hedge_ratio * np.array(x_prices)
