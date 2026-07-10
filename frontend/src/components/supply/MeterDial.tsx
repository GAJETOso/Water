"use client";

import { motion } from "framer-motion";
import Counter from "@/components/Counter";

const CX = 130;
const CY = 130;
const R = 100;
// Gauge sweeps 240° from -210° (left-down) to 30° (right-down)
const START = -210;
const SWEEP = 240;
const USAGE_L = 412; // today's demo usage
const MAX_L = 800;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function arcPath(fromDeg: number, toDeg: number, radius: number) {
  const from = polar(fromDeg, radius);
  const to = polar(toDeg, radius);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M ${from.x} ${from.y} A ${radius} ${radius} 0 ${large} 1 ${to.x} ${to.y}`;
}

/** Animated smart-meter gauge (demo telemetry). */
export default function MeterDial() {
  const fillAngle = START + (USAGE_L / MAX_L) * SWEEP;
  const needle = polar(fillAngle, R - 26);

  return (
    <div className="glass relative mx-auto w-full max-w-sm rounded-3xl p-8">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Smart Meter — Live</p>
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Healthy
        </span>
      </div>

      <svg viewBox="0 0 260 220" className="mt-2 w-full" role="img" aria-label={`Household usage today: ${USAGE_L} litres of a typical ${MAX_L} litre range`}>
        {/* track */}
        <path d={arcPath(START, START + SWEEP, R)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
        {/* fill */}
        <motion.path
          d={arcPath(START, fillAngle, R)}
          fill="none"
          stroke="url(#dial-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* needle */}
        <motion.line
          x1={CX}
          y1={CY}
          x2={needle.x}
          y2={needle.y}
          stroke="#A5F3FC"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ rotate: -((USAGE_L / MAX_L) * SWEEP), opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <circle cx={CX} cy={CY} r="7" fill="#0A1F3C" stroke="#67E8F9" strokeWidth="2" />
        <defs>
          <linearGradient id="dial-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1B6BC0" />
            <stop offset="100%" stopColor="#67E8F9" />
          </linearGradient>
        </defs>
      </svg>

      <div className="-mt-16 text-center">
        <Counter value={USAGE_L} className="font-display text-5xl text-aqua-300" />
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">litres used today</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
        <div>
          <p className="text-sm font-semibold text-white">2.4 bar</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Pressure</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">₦4,860</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Token balance</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">0 alerts</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Leak / tamper</p>
        </div>
      </div>
      <p className="mt-4 text-center text-[10px] text-slate-600">Demo telemetry — live data ships with the metering platform.</p>
    </div>
  );
}
