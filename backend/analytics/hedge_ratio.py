import numpy as np
import statsmodels.api as sm

def compute_hedge_ratio(y_prices, x_prices):
    """
    y = dependent (ETH)
    x = independent (BTC)
    """
    x = sm.add_constant(x_prices)
    model = sm.OLS(y_prices, x)
    result = model.fit()
    return result.params[1]  # beta
