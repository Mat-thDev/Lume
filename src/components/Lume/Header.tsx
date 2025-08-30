"use client";

import { Maximize, X, Minus, Minimize } from "lucide-react";
import { useState } from "react";
import { getCurrentWindow } from '@tauri-apps/api/window';


const LumeHeader = () => {

  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = async () => {
    await getCurrentWindow().minimize();
  };

  const handleMaximize = async () => {
    await getCurrentWindow().toggleMaximize();
    const maximized = await getCurrentWindow().isMaximized();
    setIsMaximized(maximized);
  };

  const handleClose = async () => {
    await getCurrentWindow().close();
  };

  return (
    <header data-tauri-drag-region className="w-full h-14 flex items-center justify-between px-4 bg-[var(--c-surface)]">
      <h1 className="text-xl font-bold select-none">Lume</h1>

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
          {!isMaximized ? <Maximize className="w-4 h-4" /> : <Minimize className="w-4 h-4" />}
        </button>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}

export default LumeHeader;
