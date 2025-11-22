import { motion } from "framer-motion";

export default function TestimonialCard({ quote, name, role }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 rounded-2xl shadow-lg border"
    >
      <p className="italic text-gray-700">“{quote}”</p>
      <footer className="mt-4 font-semibold text-blue-600">
        — {name} <span className="text-sm text-gray-400">· {role}</span>
      </footer>
    </motion.blockquote>
  );
}
