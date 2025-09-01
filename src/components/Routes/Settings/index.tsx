"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSettings from "../../../hooks/useSettings";
import { lumeSettings  } from "../../../types";
import CheckboxRow from "../../General/CheckboxRow";
import ThemePreview from "../../General/ThemePreview";
import SettingsCard from "../../General/SettingsCard";



const LumeSettings = () => {
  const { fetchSettings, setSettings } = useSettings();
  const [settings, setLocalSettings] = useState<lumeSettings | null>(null);

  useEffect(() => {
    const s = fetchSettings();
    setLocalSettings(s);
  }, [fetchSettings]);

  if (!settings) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full space-y-6"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-[var(--c-text)]">
          Configurações
        </h1>

        <AnimatePresence>
          {/* Aparência */}
          <SettingsCard title="Aparência" icon="🎨">
            <div className="flex flex-col gap-1">
              <label htmlFor="themeMode" className="text-base font-medium text-[var(--c-text)]">
                Tema
              </label>
              <span className="text-sm text-[var(--c-secondary)]">
                Selecione seu tema favorito para o Lume.
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center mt-4">
                <ThemePreview
                  label={"Tema Claro"}
                  theme={"light"}
                  selected={settings.appearance.themeMode === "light"}
                  onSelect={() =>
                    setSettings("appearance", "themeMode", "light")
                  }
                />
                <ThemePreview
                  label={"Tema Escuro"}
                  theme={"dark"}
                  selected={settings.appearance.themeMode === "dark"}
                  onSelect={() =>
                    setSettings("appearance", "themeMode", "dark")
                  }
                />
                <ThemePreview
                  label={"Tema Oled"}
                  theme={"oled"}
                  selected={settings.appearance.themeMode === "oled"}
                  onSelect={() =>
                    setSettings("appearance", "themeMode", "oled")
                  }
                />
              </div>
            </div>
          </SettingsCard>

          {/* Editor */}
          <SettingsCard title="Editor" icon="✍️" delay={0.1}>
            <div className="space-y-4">
              <CheckboxRow
                label="Salvar automaticamente"
                checked={settings.editor.autoSave}
                onChange={(v) => setSettings("editor", "autoSave", v)}
              />

              <div className="flex items-center justify-between">
                <span className="text-base text-[var(--c-text)]">
                  Intervalo de salvamento (segundos)
                </span>
                <input
                  type="number"
                  min="10"
                  value={settings.editor.autoSaveInterval}
                  onChange={(e) =>
                    setSettings("editor", "autoSaveInterval", Number(e.target.value))
                  }
                  className="px-3 py-2 w-24 rounded-md bg-[var(--c-background)] border border-[var(--c-border)] text-[var(--c-text)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] transition-all"
                />
              </div>

              <CheckboxRow
                label="Mostrar números de linha"
                checked={settings.editor.showLineNumbers}
                onChange={(v) => setSettings("editor", "showLineNumbers", v)}
              />
            </div>
          </SettingsCard>

          {/* Geral */}
          <SettingsCard title="Geral" icon="⚙️" delay={0.2}>
            <CheckboxRow
              label="Iniciar na inicialização"
              checked={settings.general.startOnBoot}
              onChange={(v) => setSettings("general", "startOnBoot", v)}
            />
          </SettingsCard>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LumeSettings;
