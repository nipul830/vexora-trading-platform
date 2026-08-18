"use client";

import { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  HistogramSeries,
  createChart,
  ColorType,
  type IChartApi,
} from "lightweight-charts";

function makeData() {
  let price = 92000;
  const candles = [];
  const volume = [];
  const start = Math.floor(Date.now() / 1000) - 60 * 60 * 48;

  for (let i = 0; i < 120; i++) {
    const open = price;
    const move = (Math.random() - 0.43) * 650;
    const close = Math.max(50000, open + move);
    const high = Math.max(open, close) + Math.random() * 350;
    const low = Math.min(open, close) - Math.random() * 350;
    price = close;
    candles.push({
      time: start + i * 60 * 60,
      open, high, low, close,
    });
    volume.push({
      time: start + i * 60 * 60,
      value: Math.round(500 + Math.random() * 1800),
      color: close >= open ? "#10b981" : "#ef4444",
    });
  }
  return { candles, volume };
}

export default function TradingChart({ timeframe }: { timeframe: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#07111d" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "#172536" },
        horzLines: { color: "#172536" },
      },
      rightPriceScale: { borderColor: "#243447" },
      timeScale: {
        borderColor: "#243447",
        rightOffset: 12,
        barSpacing: 8,
        minBarSpacing: 2,
      },
      crosshair: {
        vertLine: { color: "#7dd3fc", width: 1, style: 3 },
        horzLine: { color: "#7dd3fc", width: 1, style: 3 },
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
        axisPressedMouseMove: true,
        axisDoubleClickReset: true,
      },
      width: containerRef.current.clientWidth,
      height: 560,
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.82, bottom: 0 },
    });

    const data = makeData();
    candleSeries.setData(data.candles);
    volumeSeries.setData(data.volume);
    chart.timeScale().fitContent();
    chartRef.current = chart;

    const resize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
      chartRef.current = null;
    };
  }, [timeframe]);

  return <div ref={containerRef} className="chart" />;
}