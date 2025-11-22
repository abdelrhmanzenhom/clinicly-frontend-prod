import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import heroImg from "../assets/Landing/health-professional-team-concept.png";
import doctorRun from "../assets/Landing/doctorRun.jpg";
import patientCare from "../assets/Landing/patientCare.jpg";
import { useCountTo } from "../Hooks/useCountTo";
import StatCard from "../Components/statCard";
import TestimonialCard from "../Components/TestimonialCard";
import ActionButton from "../Components/ActionButton";

/* ----------------- small helpers ----------------- */

/** useCountTo: simple requestAnimationFrame counter */

/* ----------------- small UI components ----------------- */

/* ----------------- motion variants ----------------- */
const containerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

/* ----------------- main component ----------------- */

export default function LandingPage() {
  // parallax: hero image moves slightly with scroll
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -30]); // small parallax
  const y2 = useTransform(scrollY, [0, 700], [0, -50]); // deeper parallax for other element

  // countups
  //   const appointments = useCountTo(10340, 1600); // 10k+
  //   const doctors = useCountTo(234, 1600);
  //   const rating = useCountTo(49, 1200); // show "4.9" as 49 then display /10 below

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gradient-to-b from-gray-50 to-white">
      {/* NAV */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/70 backdrop-blur flex items-center justify-center shadow">
            <svg
              className="w-7 h-7 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3v18M3 12h18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-bold text-lg">Clinic.ly</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <ActionButton
            to="/auth/login"
            variant="secondary"
            className="px-4 py-2 text-sm"
          >
            Sign in
          </ActionButton>
          <ActionButton to="/patient/book" className="px-4 py-2 text-sm">
            Book now
          </ActionButton>
        </div>

        <div className="md:hidden">
          <ActionButton to="/patient/book" className="px-3 py-2 text-sm">
            Book
          </ActionButton>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerStagger}
            className="space-y-6"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              Smarter clinic management for{" "}
              <span className="text-blue-600">doctors</span> and{" "}
              <span className="text-blue-600">patients</span>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-600 max-w-xl"
            >
              Clinic.ly helps clinics run efficiently — appointments, patient
              records, billing and teleconsultation — all in one secure,
              beautiful dashboard.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4 items-center">
              <ActionButton to="/auth/register" className="rounded-full">
                Get Started →
              </ActionButton>

              <ActionButton
                to="/patient/book"
                variant="secondary"
                className="rounded-full"
              >
                Book Appointment
              </ActionButton>
            </motion.div>

            {/* small features chips */}
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <span className="bg-white/60 backdrop-blur px-3 py-1 rounded-full text-sm font-medium border">
                Telemedicine
              </span>
              <span className="bg-white/60 backdrop-blur px-3 py-1 rounded-full text-sm font-medium border">
                Smart reminders
              </span>
              <span className="bg-white/60 backdrop-blur px-3 py-1 rounded-full text-sm font-medium border">
                Prescriptions
              </span>
            </motion.div>
          </motion.div>

          {/* HERO IMAGE + floating, parallax */}
          <div className="relative">
            <motion.div
              //   style={{ y: y1 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl overflow-hidden"
            >
              <img
                src={heroImg}
                alt="clinic hero"
                className="w-full h-[420px] object-cover md:object-cover"
              />
            </motion.div>

            {/* <motion.div
              style={{ y: y2 }}
              className="absolute -bottom-8 right-6 transform translate-y-6"
            >
              <div className="w-56 p-4 bg-white rounded-2xl shadow-xl border -rotate-6">
                <div className="text-xs text-gray-400">Next available</div>
                <div className="mt-1 font-semibold">Dr. Amal — 2:30 PM</div>
                <div className="mt-3 text-sm text-gray-500">
                  In-person • 30m
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>

        {/* subtle SVG wave
        <div className="-mt-6">
          <svg viewBox="0 0 1440 120" className="w-full">
            <path
              fill="#ffffff"
              d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,96,576,96C672,96,768,96,864,80C960,64,1056,32,1152,21.3C1248,11,1344,21,1392,26.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div> */}
      </header>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 -mt-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard target={10340} suffix="+" label="Appointments Booked" />

            <StatCard target={234} label="Trusted Doctors" />

            <StatCard
              target={49}
              formatter={(v) => (v / 10).toFixed(1)}
              label="Avg Rating"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="text-sm uppercase opacity-80">Trusted by</div>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200"
                  alt="clinic-logo"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <div className="font-semibold">NileCare Clinic</div>
                  <div className="text-sm opacity-90">Cairo, Egypt</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-block bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-semibold transition"
              >
                Request demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">
            Loved by patients & trusted by doctors
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Booking was painless and I could see my prescription right after the appointment."
              name="Sarah Khaled"
              role="Patient"
            />
            <TestimonialCard
              quote="My clinic's workflow improved drastically—no more double bookings."
              name="Dr. Omar Hassan"
              role="GP"
            />
            <TestimonialCard
              quote="The analytics dashboard gives me a clear view of revenue and trends."
              name="Ahmed N."
              role="Clinic Admin"
            />
          </div>
        </div>
      </section>

      {/* JOIN DOCTORS */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.img
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={doctorRun}
            alt="doctor"
            className=" object-cover w-full h-[360px]"
          />

          <div>
            <motion.h4
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold"
            >
              Doctors — grow your practice,
              <br /> focus on care, not paperwork.
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-4 text-gray-600"
            >
              Tools built for clinicians: appointment management, templates,
              billing, and teleconsultation — all secure and HIPAA-ready.
            </motion.p>

            <div className="mt-6 flex gap-3">
              <Link
                to="/doctor/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:scale-[1.02] transition"
              >
                Join as Doctor
              </Link>
              <Link
                to="/features"
                className="px-5 py-3 rounded-full border border-gray-200"
              >
                See features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BOOK NOW */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Ready to transform your clinic?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 text-gray-600"
          >
            Book a demo or sign up now — fast onboarding and dedicated support.
          </motion.p>

          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Link
              to="/patient/book"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition transform"
            >
              Book Now
            </Link>
            <Link
              to="/auth/register"
              className="px-6 py-4 rounded-full border border-gray-200"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/70 flex items-center justify-center border">
              <svg
                className="w-6 h-6 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3v18M3 12h18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold">Clinic.ly</div>
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link to="/terms" className="text-gray-600">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-600">
              Privacy
            </Link>
            <Link to="/support" className="text-gray-600">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
