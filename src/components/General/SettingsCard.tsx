import { motion } from "framer-motion";

const SettingsCard = ({ title, icon, children, delay = 0 }: { title: string; icon: string; children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, delay }}
    className="bg-[var(--c-surface)] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <h2 className="text-xl font-semibold text-[var(--c-text)] mb-4 flex items-center gap-2">
      <span>{icon}</span> {title}
    </h2>
    {children}
  </motion.div>
);

export default SettingsCard;
