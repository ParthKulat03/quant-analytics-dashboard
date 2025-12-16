const API_BASE = "http://127.0.0.1:5000";

export async function getAlertsConfig() {
  const res = await fetch(`${API_BASE}/api/alerts/config`);
  if (!res.ok) throw new Error("Failed to fetch alert config");
  return res.json();
}

export async function getAlertsHistory() {
  const res = await fetch(`${API_BASE}/api/alerts/history`);
  if (!res.ok) throw new Error("Failed to fetch alert history");
  return res.json();
}

export async function addAlert(alert: any) {
  const res = await fetch(`${API_BASE}/api/alerts/config`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(alert),
  });
  if (!res.ok) throw new Error("Failed to add alert");
  return res.json();
}

export async function deleteAlert(id: string) {
  return fetch(`${API_BASE}/api/alerts/config/${id}`, {
    method: "DELETE",
  });
}

export const getOverviewMetrics = async () =>
  fetch(`${API_BASE}/api/overview/metrics`).then(r => r.json());

export const getOverviewSeries = async () =>
  fetch(`${API_BASE}/api/overview/series`).then(r => r.json());

export async function getOrderBook(symbol: string) {
  const res = await fetch(`http://127.0.0.1:5000/api/overview/orderbook/${symbol}`);
  if (!res.ok) throw new Error("Failed to load orderbook");
  return res.json();
}
