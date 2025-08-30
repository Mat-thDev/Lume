import { motion } from "framer-motion";

const NoteItem = ({ title }: { title?: string }) => (
  <motion.li
    className="p-4 rounded-lg bg-[var(--c-surface)] hover:bg-[var(--c-surface-hover)] cursor-pointer transition-colors duration-200 flex items-center gap-2"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    role="button"
    tabIndex={0}
    aria-label={`Abrir nota: ${title}`}
    onKeyDown={(e) => e.key === 'Enter' && console.log(`Abrir nota: ${title}`)} // Placeholder for click handler
  >
    <span className="text-[var(--c-accent)]">✦</span>
    <span>{title}</span>
  </motion.li>
);

export default NoteItem;
