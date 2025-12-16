# QuantAnalytics — Real-Time Market Analytics & Alerting Dashboard

QuantAnalytics is a **full-stack real-time financial analytics platform** designed for quantitative trading analysis.  
It ingests live market data from Binance, computes statistical indicators such as **spread, Z-score, hedge ratio**, and provides a **live dashboard with alerts, order book, and analytics visualizations**.

This project demonstrates **real-time data engineering, statistical analytics, WebSocket streaming, Redis buffering, and a modern React dashboard**.

---

## 🚀 Features

### 📊 Live Analytics Dashboard
- Real-time price charts (ETH-USDT)
- Spread & Z-Score monitoring
- Hedge ratio, correlation, and stationarity metrics
- Dynamic order book visualization

### 🚨 Alert Management System
- User-defined alerts (e.g. **Z-Score > 2**)
- Real-time alert triggering
- Alert history tracking
- Redis-backed alert persistence

### 📈 Market Data Processing
- Live Binance WebSocket ingestion
- Rolling buffers using Redis
- Statistical calculations in real time
- Efficient backend → frontend data flow

---

## 🧱 Tech Stack

### Frontend
- **React + TypeScript**
- **Vite**
- **TailwindCSS**
- **Recharts** (charts)
- **Radix UI / shadcn-ui**
- Fetch-based API integration

### Backend
- **Python (Flask)**
- **Binance WebSocket API**
- **Redis** (rolling buffers & state)
- **Threaded WebSocket consumers**
- Modular analytics engine

---

## 🏗️ System Architecture

Binance WebSocket
↓
WebSocket Threads
↓
Redis Buffers
↓
Analytics Engine
↓
Flask REST API
↓
React Dashboard


---

## 📐 Analytics Methodology

### 1️⃣ Price Ingestion
- Trades are streamed from Binance WebSocket (`@trade`)
- Each trade is normalized and stored in Redis:
ticks:BTCUSDT
ticks:ETHUSDT


### 2️⃣ Hedge Ratio
The hedge ratio is computed as:
hedge_ratio = mean(ETH prices) / mean(BTC prices)
This ratio is used to normalize the price spread.

---

### 3️⃣ Spread Calculation
spread = ETH_price − hedge_ratio × BTC_price
A rolling spread series is maintained for analysis.

---

### 4️⃣ Z-Score Calculation
z = (spread − mean(spread)) / std(spread)
This measures how extreme the current spread is relative to its history.

---

### 5️⃣ Stationarity & Correlation
- ADF p-value (placeholder, extensible)
- Rolling correlation between assets
- Used for statistical arbitrage signals

---

## 🚨 Alerting Logic

Users can define alerts such as:

> **Trigger alert when Z-Score > 2**

### Alert Flow
1. User creates alert via UI
2. Alert config stored in Redis
3. Analytics engine evaluates conditions
4. When condition matches:
   - Alert is triggered
   - History entry is recorded
   - Frontend updates in real time

---

## 📘 Order Book Processing

- Binance depth updates processed via WebSocket
- Top 20 bids & asks stored in Redis
- Frontend displays:
  - Price
  - Size
  - Cumulative depth (visual bars)

---

## 🖥️ Dashboard Overview

### Main Dashboard
- Live price chart (ETH-USDT)
- Spread & Z-Score chart with thresholds
- Active alerts panel
- Real-time order book

### Alerts Page
- Create / delete alerts
- Toggle alert enablement
- View alert history


### Backend Setup

cd backend
pip install -r requirements.txt

Start backend:  python -m backend.app


### Frontend Setup

cd client
npm install

Start Frontend:  npm run dev

---

## ✅ What You Can Do Next
If you want, I can:
- Add **deployment section (Render + Netlify)**
- Write **resume bullet points**
- Create **demo video script**
- Convert this into a **research-style project description**

Just tell me 👍
