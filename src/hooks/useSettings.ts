"use client"

import { useAtom } from "jotai"
import { LumeSettings } from "../storage/storage"
import { lumeSettings } from "../types"

export const defaultSettings: lumeSettings = {
  appearance: {
    themeMode: "dark"
  },
  editor: {
    autoSave: false,
    autoSaveInterval: 0,
    showLineNumbers: false
  },
  general: {
    startOnBoot: false
  }
}

const useSettings = () => {
  const [lumeSettings, setLumeSettings] = useAtom(LumeSettings)

  const fetchSettings = () => lumeSettings;

  const setSettings = <T extends keyof lumeSettings, K extends keyof lumeSettings[T]>(group: T, item: K, value: lumeSettings[T][K]) => {
    setLumeSettings((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [item]: value,
      },
    }));
  };

  const resetSettings = () => {
    setLumeSettings(defaultSettings);
  }

  const appTheme = () => lumeSettings.appearance.themeMode;

  return {
    fetchSettings,
    setSettings,
    resetSettings,
    appTheme
  }
}

export default useSettings;
