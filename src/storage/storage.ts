import { atom } from "jotai";
import { lumeSettings, routes } from "../types";
import { defaultSettings } from "../hooks/useSettings";


// Routes
export const LumeRoute = atom<routes>("Home");


// Settings
export const LumeSettings = atom<lumeSettings>(defaultSettings);
