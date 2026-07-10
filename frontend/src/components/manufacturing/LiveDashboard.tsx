"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PRODUCTION_LINES } from "@/lib/data";

function jitter(base: number, spread: number) {
  return Math.max(0, base + (Math.random() - 0.5) * spread);
}

/** Simulated real-time production dashboard (client-side demo data). */
export default function LiveDashboard() {
  const [lines, setLines] = useState(PRODUCTION_LINES);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      setLines((prev) =>
        prev.map((line) =>
          line.status === "Running"
            ? {
                ...line,
                output: Math.round(jitter(line.output, line.output * 0.02)),
                efficiency: Math.min(99.9, +jitter(line.efficiency, 0.6).toFixed(1)),
              }
            : line
        )
      );
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const totalOutput = lines.reduce((sum, l) => sum + l.output, 0);
  const running = lines.filter((l) => l.status === "Running").length;

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-8 py-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <p className="text-sm font-semibold text-white">Live Production — Lagos Plant 1</p>
        </div>
        <p className="text-xs text-slate-400">
          SCADA feed · refresh #{tick} · demo data
        </p>
      </div>

      <div className="grid gap-px bg-white/5 sm:grid-cols-3">
        {[
          { label: "Bottles / hour (all lines)", value: totalOutput.toLocaleString() },
          { label: "Lines running", value: `${running} / ${lines.length}` },
          { label: "Plant OEE", value: "96.1%" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-navy-950/60 px-8 py-6">
            <p className="font-display text-3xl text-aqua-300">{kpi.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="divide-y divide-white/5">
        {lines.map((line) => (
          <div key={line.name} className="flex flex-wrap items-center gap-4 px-8 py-4">
            <div className="w-52 min-w-0">
              <p className="truncate text-sm text-white">{line.name}</p>
              <p
                className={`text-[11px] font-semibold uppercase tracking-wider ${
                  line.status === "Running" ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {line.status}
              </p>
            </div>
            <div className="h-2 min-w-32 flex-1 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className={`h-full rounded-full ${
                  line.status === "Running"
                    ? "bg-gradient-to-r from-ocean-500 to-aqua-300"
                    : "bg-amber-500/40"
                }`}
                animate={{ width: `${line.efficiency}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <div className="w-24 text-right">
              <p className="text-sm tabular-nums text-white">
                {line.status === "Running" ? line.output.toLocaleString() : "—"}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">bph</p>
            </div>
            <div className="w-16 text-right text-sm tabular-nums text-aqua-300">
              {line.status === "Running" ? `${line.efficiency}%` : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
