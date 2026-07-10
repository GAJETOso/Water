"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Demo telemetry for meter AQF-004211 — fixed values so SSR/client renders match.
const DAYS = ["27", "28", "29", "30", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
const USAGE_L = [380, 420, 395, 510, 600, 640, 410, 388, 402, 455, 700, 380, 365, 412];
const PERIOD_LABEL = "27 Jun – 10 Jul 2026";

const TOPUPS = [
  { date: "08 Jul 2026", amount: "₦5,000", volume: "13.5 m³", channel: "WhatsApp", token: "1846 •••• •••• 0827" },
  { date: "22 Jun 2026", amount: "₦5,000", volume: "13.6 m³", channel: "Telegram", token: "0031 •••• •••• 4419" },
  { date: "05 Jun 2026", amount: "₦2,000", volume: "5.4 m³", channel: "Agent", token: "7720 •••• •••• 1063" },
];

const ALERTS = [
  {
    kind: "Leak warning",
    tone: "amber",
    date: "07 Jul, 02:14",
    text: "Continuous flow detected for 6 hours (Jul 7). Marked resolved — garden tap left open.",
    resolved: true,
  },
  {
    kind: "Low balance",
    tone: "sky",
    date: "08 Jul, 09:00",
    text: "Balance fell below ₦1,000 — top-up reminder sent to WhatsApp. Topped up same day.",
    resolved: true,
  },
];

const W = 560;
const H = 240;
const PAD = { top: 22, right: 12, bottom: 30, left: 40 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;
const MAX = 800;

function UsageBars() {
  const [hover, setHover] = useState<number | null>(null);
  const slot = plotW / USAGE_L.length;
  const barW = Math.min(22, slot * 0.55);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={`Daily water usage in litres, ${PERIOD_LABEL}`}
    >
      {[0, 200, 400, 600, 800].map((t) => {
        const y = PAD.top + plotH - (t / MAX) * plotH;
        return (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
            <text x={PAD.left - 8} y={y + 3.5} textAnchor="end" fontSize="10" fill="#64748B">
              {t}
            </text>
          </g>
        );
      })}
      {USAGE_L.map((v, i) => {
        const h = (v / MAX) * plotH;
        const cx = PAD.left + slot * (i + 0.5);
        const y = PAD.top + plotH - h;
        return (
          <g key={i}>
            <motion.rect
              x={cx - barW / 2}
              width={barW}
              rx={4}
              initial={{ y: PAD.top + plotH, height: 0 }}
              whileInView={{ y, height: h }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              fill="#38BDF8"
              opacity={hover === null || hover === i ? 1 : 0.4}
            />
            <rect
              x={cx - slot / 2}
              y={PAD.top}
              width={slot}
              height={plotH}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
            {i === USAGE_L.length - 1 && (
              <text x={cx} y={y - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E2E8F0">
                {v} L
              </text>
            )}
            <text
              x={cx}
              y={H - 10}
              textAnchor="middle"
              fontSize="9"
              fill={i % 2 === USAGE_L.length % 2 ? "#64748B" : "transparent"}
            >
              {DAYS[i]}
            </text>
          </g>
        );
      })}
      {hover !== null && (
        <g pointerEvents="none">
          <rect
            x={Math.min(Math.max(PAD.left + slot * (hover + 0.5) - 44, 4), W - 92)}
            y={Math.max(PAD.top + plotH - (USAGE_L[hover] / MAX) * plotH - 42, 4)}
            width="88"
            height="32"
            rx="8"
            fill="#040B16"
            stroke="rgba(165,243,252,0.35)"
          />
          <text
            x={Math.min(Math.max(PAD.left + slot * (hover + 0.5), 48), W - 48)}
            y={Math.max(PAD.top + plotH - (USAGE_L[hover] / MAX) * plotH - 42, 4) + 13}
            textAnchor="middle"
            fontSize="9"
            fill="#94A3B8"
          >
            Day {DAYS[hover]}
          </text>
          <text
            x={Math.min(Math.max(PAD.left + slot * (hover + 0.5), 48), W - 48)}
            y={Math.max(PAD.top + plotH - (USAGE_L[hover] / MAX) * plotH - 42, 4) + 26}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#F1F5F9"
          >
            {USAGE_L[hover]} litres
          </text>
        </g>
      )}
    </svg>
  );
}

export default function UsageDashboard() {
  const total = USAGE_L.reduce((a, b) => a + b, 0);
  const avg = Math.round(total / USAGE_L.length);

  return (
    <div className="space-y-6">
      {/* Meter header */}
      <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-3xl px-8 py-6">
        <div>
          <p className="text-sm font-semibold text-white">Meter AQF-004211 · Home</p>
          <p className="text-xs text-slate-500">Ultrasonic · Prepaid · Lekki Phase 1 Network</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="font-display text-2xl text-aqua-300">₦4,860</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Token balance</p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl text-white">{(total / 1000).toFixed(2)} m³</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Used, last 14 days</p>
          </div>
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Online
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Usage chart */}
        <div className="glass rounded-3xl p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">Daily usage</h3>
            <p className="text-xs text-slate-500">
              {PERIOD_LABEL} · avg {avg} L/day
            </p>
          </div>
          <div className="mt-4">
            <UsageBars />
          </div>
          <table className="sr-only">
            <caption>Daily water usage in litres, {PERIOD_LABEL}</caption>
            <thead>
              <tr>
                <th>Day of month</th>
                <th>Usage (litres)</th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map((d, i) => (
                <tr key={d + i}>
                  <td>{d}</td>
                  <td>{USAGE_L[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerts */}
        <div className="glass rounded-3xl p-7">
          <h3 className="text-sm font-semibold text-white">Alerts</h3>
          <div className="mt-4 space-y-4">
            {ALERTS.map((a) => (
              <div key={a.kind + a.date} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${
                      a.tone === "amber" ? "text-amber-300" : "text-sky-300"
                    }`}
                  >
                    {a.kind}
                  </p>
                  <span className="text-[10px] text-slate-500">{a.date}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{a.text}</p>
                {a.resolved && (
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                    ✓ Resolved
                  </p>
                )}
              </div>
            ))}
            <p className="text-[11px] text-slate-600">
              Leak, tamper and low-balance alerts are pushed to WhatsApp, Telegram and the app.
            </p>
          </div>
        </div>
      </div>

      {/* Top-up history */}
      <div className="glass overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between px-8 py-5">
          <h3 className="text-sm font-semibold text-white">Top-up history</h3>
          <p className="text-xs text-slate-500">Prepaid tokens · Standard tier</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-y border-white/10 bg-white/[0.04] text-xs uppercase tracking-[0.15em] text-slate-400">
                <th scope="col" className="px-8 py-3.5 font-semibold">Date</th>
                <th scope="col" className="px-8 py-3.5 font-semibold">Amount</th>
                <th scope="col" className="px-8 py-3.5 font-semibold">Volume</th>
                <th scope="col" className="px-8 py-3.5 font-semibold">Channel</th>
                <th scope="col" className="px-8 py-3.5 font-semibold">Token</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {TOPUPS.map((t) => (
                <tr key={t.token} className="transition-colors hover:bg-white/[0.04]">
                  <td className="px-8 py-4 text-slate-300">{t.date}</td>
                  <td className="px-8 py-4 tabular-nums text-white">{t.amount}</td>
                  <td className="px-8 py-4 tabular-nums text-slate-300">{t.volume}</td>
                  <td className="px-8 py-4 text-slate-400">{t.channel}</td>
                  <td className="px-8 py-4 font-mono text-xs text-slate-400">{t.token}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
