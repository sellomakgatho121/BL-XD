"use client";

import { useState } from "react";
import { ArrowRight, Terminal, Mail, MapPin, Phone, Github, Linkedin, Instagram, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  return (
    <main className="bg-[var(--neo-white)] text-[var(--neo-black)] min-h-screen font-space-grotesk selection:bg-[var(--neo-yellow)] selection:text-[var(--neo-black)] pb-32">
      {/* ━━━ NAVIGATION ━━━ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-[var(--neo-black)] bg-[var(--neo-white)]">
        <div className="max-w-[1400px] mx-auto px-6 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--neo-yellow)] neo-border flex items-center justify-center neo-shadow">
              <span className="font-black text-xl">B</span>
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase hidden sm:block">
              Blacklight
            </span>
          </Link>

          <Link
            href="/"
            className="px-6 py-2 bg-[var(--neo-black)] text-[var(--neo-white)] font-bold uppercase tracking-wider neo-border neo-shadow-interactive flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>
      </nav>

      <div className="pt-32 max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* Left Side: Brutal Form */}
        <div>
          <div className="bg-[var(--neo-yellow)] neo-border neo-shadow inline-block p-4 mb-8 rotate-[-2deg]">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Initiate<br />Sequence</h1>
          </div>

          <p className="font-bold text-xl mb-12 max-w-md">
            Skip the small talk. Tell us what you need and we&apos;ll build you a digital anomaly.
          </p>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label htmlFor="name" className="font-black uppercase tracking-widest block text-xl bg-[var(--neo-black)] text-[var(--neo-white)] px-3 py-1 w-max">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-transparent neo-border p-4 text-xl font-bold focus:bg-[var(--neo-yellow)] focus:outline-none transition-colors neo-shadow-interactive"
                  placeholder="JOHN DOE"
                  required
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="email" className="font-black uppercase tracking-widest block text-xl bg-[var(--neo-black)] text-[var(--neo-white)] px-3 py-1 w-max">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent neo-border p-4 text-xl font-bold focus:bg-[var(--neo-yellow)] focus:outline-none transition-colors neo-shadow-interactive"
                  placeholder="JANE@CORP.COM"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="service" className="font-black uppercase tracking-widest block text-xl bg-[var(--neo-black)] text-[var(--neo-white)] px-3 py-1 w-max">Requirement</label>
              <select
                id="service"
                className="w-full bg-transparent neo-border p-4 text-xl font-bold appearance-none focus:bg-[var(--neo-yellow)] focus:outline-none transition-colors cursor-pointer neo-shadow-interactive"
                required
              >
                <option value="">SELECT A TIER...</option>
                <option value="spark">LANDING PAGE</option>
                <option value="growth">BUSINESS SITE</option>
                <option value="shop">E-COMMERCE</option>
                <option value="pulse">PULSE CHECK AUDIT</option>
                <option value="other">BESPOKE / OTHER</option>
              </select>
            </div>

            <div className="space-y-4">
              <label htmlFor="message" className="font-black uppercase tracking-widest block text-xl bg-[var(--neo-black)] text-[var(--neo-white)] px-3 py-1 w-max">Intel</label>
              <textarea
                id="message"
                rows={6}
                className="w-full bg-transparent neo-border p-4 text-xl font-bold focus:bg-[var(--neo-yellow)] focus:outline-none transition-colors neo-shadow-interactive resize-y"
                placeholder="THE UNVARNISHED TRUTH..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-6 bg-[var(--neo-pink)] text-[var(--neo-black)] font-black uppercase text-3xl neo-border neo-shadow-interactive flex items-center justify-center gap-4 group"
            >
              TRANSMIT
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>

        {/* Right Side: Brutal Info Blocks */}
        <div className="flex flex-col gap-8">

          {/* Info Block 1 */}
          <div className="bg-[var(--neo-white)] neo-border neo-shadow p-8 flex items-start items-center gap-6 group hover:bg-[var(--neo-blue)] transition-colors">
            <div className="w-16 h-16 bg-[var(--neo-yellow)] neo-border flex items-center justify-center shrink-0">
              <Mail size={32} />
            </div>
            <div>
              <h3 className="font-black text-2xl uppercase group-hover:text-[var(--neo-white)]">Direct Line</h3>
              <a href="mailto:hello@blacklight.co.za" className="font-bold text-xl underline group-hover:text-[var(--neo-white)]">hello@blacklight.co.za</a>
            </div>
          </div>

          {/* Info Block 2 */}
          <div className="bg-[var(--neo-white)] neo-border neo-shadow p-8 flex items-start items-center gap-6 group hover:bg-[var(--neo-green)] transition-colors">
            <div className="w-16 h-16 bg-[var(--neo-pink)] text-[var(--neo-white)] neo-border flex items-center justify-center shrink-0">
              <Phone size={32} />
            </div>
            <div>
              <h3 className="font-black text-2xl uppercase group-hover:text-[var(--neo-black)]">Comms</h3>
              <p className="font-bold text-xl group-hover:text-[var(--neo-black)]">+27 (0) 00 000 0000</p>
            </div>
          </div>

          {/* Info Block 3 */}
          <div className="bg-[var(--neo-white)] neo-border neo-shadow p-8 flex items-start items-center gap-6 group hover:bg-[var(--neo-orange)] transition-colors">
            <div className="w-16 h-16 bg-[var(--neo-blue)] text-[var(--neo-white)] neo-border flex items-center justify-center shrink-0">
              <MapPin size={32} />
            </div>
            <div>
              <h3 className="font-black text-2xl uppercase">HQ</h3>
              <p className="font-bold text-xl">Johannesburg, ZA<br />(Remote Globally)</p>
            </div>
          </div>

          {/* Socials Box */}
          <div className="bg-[var(--neo-black)] text-[var(--neo-white)] neo-border neo-shadow p-8 mt-auto rotate-[1deg]">
            <h3 className="font-black text-3xl uppercase mb-6 bg-[var(--neo-white)] text-[var(--neo-black)] inline-block px-4 py-1">Node Access</h3>
            <div className="flex gap-6">
              <a href="#" className="w-16 h-16 bg-[var(--neo-white)] text-[var(--neo-black)] neo-border neo-shadow-interactive flex items-center justify-center hover:bg-[var(--neo-yellow)]">
                <Github size={32} />
              </a>
              <a href="#" className="w-16 h-16 bg-[var(--neo-blue)] text-[var(--neo-white)] neo-border neo-shadow-interactive flex items-center justify-center hover:bg-[var(--neo-pink)]">
                <Linkedin size={32} />
              </a>
              <a href="#" className="w-16 h-16 bg-[var(--neo-pink)] text-[var(--neo-black)] neo-border neo-shadow-interactive flex items-center justify-center hover:bg-[var(--neo-yellow)]">
                <Instagram size={32} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
