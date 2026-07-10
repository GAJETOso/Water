"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 24));
  }, [scrollY]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/10 bg-navy-950/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="section flex h-[72px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="AQUOR home">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path
              d="M16 2C16 2 6 14.2 6 21a10 10 0 0 0 20 0C26 14.2 16 2 16 2Z"
              fill="url(#drop)"
            />
            <path
              d="M11.5 21.5a4.5 4.5 0 0 0 3 4.2"
              stroke="#A5F3FC"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.9"
            />
            <defs>
              <linearGradient id="drop" x1="6" y1="2" x2="26" y2="31" gradientUnits="userSpaceOnUse">
                <stop stopColor="#67E8F9" />
                <stop offset="1" stopColor="#0E4D92" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-lg font-bold tracking-[0.25em] text-white">AQUOR</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-300 hover:text-aqua-300 ${
                pathname === link.href ? "text-aqua-300" : "text-slate-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/portals" className="btn-ghost !px-5 !py-2.5 text-xs">
            Portals
          </Link>
          <Link href="/contact" className="btn-primary !px-5 !py-2.5 text-xs">
            Order Water
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/10 bg-navy-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="section flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-sm text-slate-200 transition-colors hover:bg-white/5 hover:text-aqua-300"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex gap-3 px-3 pb-2">
                <Link href="/portals" className="btn-ghost flex-1 justify-center !py-3 text-xs">
                  Portals
                </Link>
                <Link href="/contact" className="btn-primary flex-1 justify-center !py-3 text-xs">
                  Order Water
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
