import time
from backend.alerts.evaluator import evaluate_alerts

def start_alert_engine():
    while True:
        evaluate_alerts()
        time.sleep(5)
