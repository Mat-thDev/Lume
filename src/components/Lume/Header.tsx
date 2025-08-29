"use client";

import { Maximize, X, Settings, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { getCurrentWindow } from '@tauri-apps/api/window';


const LumeHeader = () => {

  const [_, setIsMaximized] = useState(false);

  const handleMinimize = async () => {
    await getCurrentWindow().minimize();
  };

  const handleMaximize = async () => {
    await getCurrentWindow().maximize();
    setIsMaximized(true);
  };

  const handleClose = async () => {
    await getCurrentWindow().close();
  };

  return (
    <header data-tauri-drag-region className="col-span-2 row-start-1 w-full h-16 flex items-center justify-between px-6 bg-[var(--c-surface)]">

      <h1 className="text-2xl font-bold select-none">Lume</h1>

      <div className="flex items-center space-x-4">
        <button className="flex items-center px-3 py-1 rounded bg-[var(--c-success)] text-[var(--c-background)] hover:bg-[var(--c-accentHover)] transition-colors">
          <Plus className="w-4 h-4 mr-1" /> Novo
        </button>
        <button className="flex items-center px-3 py-1 rounded bg-[var(--c-info)] text-[var(--c-background)] hover:bg-[var(--c-accentHover)] transition-colors">
          <Settings className="w-4 h-4 mr-1" /> Config
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleMinimize}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--c-accentHover)] transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleMaximize}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--c-accentHover)] transition-colors"
        >
          <Maximize className="w-4 h-4" />
        </button>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </header>
  )
}

export default LumeHeader;
