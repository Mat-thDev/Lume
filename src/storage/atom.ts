import { atom } from "jotai";
import { lumeSettings, lumeState, routes } from "../types";
import { defaultSettings } from "../hooks/useSettings";

// State
export const autoSaveSaving = atom<boolean>(false);
export const EditorSidebarCollapsed = atom<boolean>(false);
export const LumeSelectedArchive = atom<string | null>(null);
export const LumeState = atom<lumeState>({ nest: null, currentFile: null })
// Routes
export const LumeRoute = atom<routes>("Home");
// Settings
export const LumeSettings = atom<lumeSettings>(defaultSettings);
