"use client";

import { useState } from "react";
import TradingChart from "../components/TradingChart";

const timeframes = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"];

export default function Home() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [timeframe, setTimeframe] = useState("1H");

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">VEXORA</div>
        <div className="symbol">
          <span className="coin">₿</span>
          <strong>{symbol}</strong>
          <span className="live">LIVE DEMO</span>
        </div>
        <button className="iconBtn" aria-label="Search">⌕</button>
        <button className="iconBtn" aria-label="Menu">⋯</button>
      </header>

      <section className="quote">
        <div className="title">Bitcoin / TetherUS <span className="live">LIVE</span></div>
        <div className="price">93,482.10 <span>+2,174.30 (+2.38%)</span></div>
      </section>

      <section className="toolbar">
        <button className="toolBtn">◎ Crosshair</button>
        <button className="toolBtn">⛶ Full Screen</button>
        <div className="timeframes">
          {timeframes.map((tf) => (
            <button
              key={tf}
              className={tf === timeframe ? "tf active" : "tf"}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </section>

      <section className="chartCard">
        <TradingChart timeframe={timeframe} />
      </section>

      <section className="hint">
        <span>🤏</span> Pinch with two fingers to zoom • Drag to move the chart • Use Full Screen for chart-only view
      </section>
    </main>
  );
}