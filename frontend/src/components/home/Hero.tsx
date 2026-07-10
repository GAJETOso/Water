"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import WaterCanvas from "@/components/WaterCanvas";
import Bottle from "@/components/Bottle";
import { COMPANY } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yBottle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 bg-hero-radial" />
      <WaterCanvas className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />

      <div className="section relative z-10 grid items-center gap-16 pb-24 pt-36 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div style={{ y: yText, opacity }}>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="eyebrow"
          >
            One of Africa&apos;s largest water &amp; beverage companies
          </motion.p>
          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] text-white md:text-7xl">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease }}
            >
              From mountain rain
            </motion.span>
            <motion.span
              className="text-gradient block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}
            >
              to your hands.
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            {COMPANY.tagline} Every category of packaged drinking water — sachet to luxury glass —
            purified through nine stages, bottled by robotics, and delivered across 54 markets.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/products" className="btn-primary">
              Explore Products
              <span aria-hidden>→</span>
            </Link>
            <Link href="/manufacturing" className="btn-ghost">
              Inside the Factory
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yBottle }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease }}
          className="relative mx-auto hidden lg:block"
        >
          <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-aqua-400/10 blur-3xl" />
          <div className="animate-float-slow">
            <Bottle className="h-[420px] drop-shadow-[0_30px_60px_rgba(56,189,248,0.25)]" />
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-aqua-300"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
