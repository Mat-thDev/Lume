export const themeClasses = {
  light: {
    bg: "bg-[var(--color-light-background)]",
    border: "border-[var(--color-light-border)]",
    text: "bg-[var(--color-light-primary)]",
    accent: "text-[var(--color-light-accent)]",
    surface: "bg-[var(--color-light-surface)]",
    secondary: "bg-[var(--color-light-secondary)]",
  },
  dark: {
    bg: "bg-[var(--color-dark-background)]",
    border: "border-[var(--color-dark-border)]",
    text: "bg-[var(--color-dark-primary)]",
    accent: "text-[var(--color-dark-accent)]",
    surface: "bg-[var(--color-dark-surface)]",
    secondary: "bg-[var(--color-dark-secondary)]",
  },
  oled: {
    bg: "bg-[var(--color-oled-background)]",
    border: "border-[var(--color-oled-border)]",
    text: "bg-[var(--color-oled-primary)]",
    accent: "text-[var(--color-oled-accent)]",
    surface: "bg-[var(--color-oled-surface)]",
    secondary: "bg-[var(--color-oled-secondary)]",
  },
} as const;
