import { useInView } from "framer-motion";
import { useCountTo } from "../Hooks/useCountTo";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function StatCard({ target, suffix = "", label, formatter }) {
  const ref = useRef(null);

  // detect when this card enters view
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  // counting starts only when visible
  const value = useCountTo(target, 1500, isInView);

  // apply formatter if provided
  const displayValue = formatter ? formatter(value) : value.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="bg-white rounded-2xl p-6 shadow-md border"
    >
      <div className="text-4xl md:text-5xl font-extrabold text-blue-600">
        {displayValue}
        {suffix && <span className="text-xl ml-1 text-gray-500">{suffix}</span>}
      </div>
      <div className="mt-2 text-gray-500">{label}</div>
    </motion.div>
  );
}
