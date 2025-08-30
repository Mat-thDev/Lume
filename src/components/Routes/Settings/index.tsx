"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSettings from "../../../hooks/useSettings";
import { themes } from "../../../types";

const LumeSettings = () => {
  const { fetchSettings, setSettings, resetSettings } = useSettings();
  const [settings, setLocalSettings] = useState<any>(null);

  useEffect(() => {
    const s = fetchSettings();
    setLocalSettings(s);
  }, [fetchSettings]);

  if (!settings) return null;

  const handleReset = () => {
    resetSettings();
  };

  // const handleSave = () => {
  //   console.log("Salvar em backend/Tauri futuramente");
  // };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full space-y-6"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Configurações
        </h1>

        <AnimatePresence>
          {/* Aparência */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[var(--c-surface)] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>🎨</span> Aparência
            </h2>
            <div className="flex items-center justify-between">
              <label htmlFor="themeMode" className="text-base">
                Tema
              </label>
              <select
                id="themeMode"
                value={settings.appearance.themeMode}
                onChange={(e) => setSettings("appearance", "themeMode", e.target.value as themes)}
                className="p-2 rounded-md bg-[var(--c-background)] border border-[var(--c-border)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] transition-all"
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
                <option value="oled">OLED</option>
              </select>
            </div>
          </motion.div>

          {/* Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-[var(--c-surface)] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>✍️</span> Editor
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base">Salvar automaticamente</span>
                <input
                  type="checkbox"
                  checked={settings.editor.autoSave}
                  onChange={(e) => setSettings("editor", "autoSave", e.target.checked)}
                  className="h-5 w-5 accent-[var(--c-accent)] rounded focus:ring-[var(--c-accent)]"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base text-[var(--c-text)]">Intervalo de salvamento (segundos)</span>
                <input
                  type="number"
                  min="5"
                  value={settings.editor.autoSaveInterval}
                  onChange={(e) => setSettings("editor", "autoSaveInterval", Number(e.target.value))}
                  className="px-3 py-2 w-24 rounded-md bg-[var(--c-background)] border border-[var(--c-border)] text-[var(--c-text)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] transition-all"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base text-[var(--c-text)]">Mostrar números de linha</span>
                <input
                  type="checkbox"
                  checked={settings.editor.showLineNumbers}
                  onChange={(e) => setSettings("editor", "showLineNumbers", e.target.checked)}
                  className="h-5 w-5 accent-[var(--c-accent)] rounded focus:ring-[var(--c-accent)]"
                />
              </div>
            </div>
          </motion.div>

          {/* Geral */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-[var(--c-surface)] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-[var(--c-text)] mb-4 flex items-center gap-2">
              <span>⚙️</span> Geral
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-base text-[var(--c-text)]">Iniciar na inicialização</span>
              <input
                type="checkbox"
                checked={settings.general.startOnBoot}
                onChange={(e) => setSettings("general", "startOnBoot", e.target.checked)}
                className="h-5 w-5 accent-[var(--c-accent)] rounded focus:ring-[var(--c-accent)]"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-[var(--c-surface)] text-[var(--c-text)] rounded-lg hover:bg-[var(--c-accent)] hover:text-white transition-all"
          >
            Resetar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LumeSettings;
