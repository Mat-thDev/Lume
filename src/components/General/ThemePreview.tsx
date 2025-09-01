import clsx from "clsx";
import { motion } from "framer-motion";
import { themeClasses } from "../../utils/themeClasses";
import { ThemePreviewProps } from "../../types";
import { Check } from "lucide-react";

const ThemePreview = ({ label, theme, selected, onSelect }: ThemePreviewProps) => {
  const t = themeClasses[theme];

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={clsx(
        "w-48 rounded-xl shadow-md overflow-hidden transition-all duration-200 border-2 cursor-pointer relative",
        t.bg,
        selected
          ? [t.accent, "border-[var(--color-" + theme + "-accent)]", "shadow-lg"]
          : ["border-transparent", "hover:" + t.border]
      )}
    >
      <div className={clsx("h-24 flex items-center justify-center p-3 border-b", t.bg, t.border)}>
        <div className={clsx("w-36 h-16 rounded-lg flex items-center gap-3 px-3 shadow-inner", t.surface)}>
          <div className={clsx("w-8 h-8 rounded-full", t.bg)} />
          <div className="space-y-1.5">
            <div className={clsx("w-16 h-2 rounded-full", t.text)} />
            <div className={clsx("w-12 h-2 rounded-full", t.secondary)} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-2 bg-[var(--c-background)]">
        <span className="text-sm font-medium text-[var(--c-text)]">{label}</span>
        {selected ? (
          <Check className={clsx("w-4 h-4", t.accent)} />
        ) : (
          <div className={clsx("w-4 h-4 rounded-full", t.border)} />
        )}
      </div>
    </motion.button>
  );
};

export default ThemePreview;
