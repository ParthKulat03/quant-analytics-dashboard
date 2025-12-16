from statsmodels.tsa.stattools import adfuller

def compute_adf(series):
    result = adfuller(series)
    return {
        "adf_stat": float(result[0]),
        "p_value": float(result[1]),
        "stationary": bool(result[1] < 0.05)
    }

