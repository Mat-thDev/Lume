import { motion } from "framer-motion";

const CheckboxRow = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <div className="flex items-center justify-between">
    <span className="text-base text-[var(--c-text)]">{label}</span>
    <motion.input
      whileTap={{ scale: 0.9 }}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-5 w-5 accent-[var(--c-accent)] rounded focus:ring-[var(--c-accent)] cursor-pointer"
    />
  </div>
);

export default CheckboxRow;
