"use client";

import { Maximize, X, Minus, Minimize } from "lucide-react";
import { useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import useRoutes from "../../hooks/useRoutes";

const LumeHeader = () => {
  const { activeRoute } = useRoutes();
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = async () => await getCurrentWindow().minimize();
  const handleMaximize = async () => {
    await getCurrentWindow().toggleMaximize();
    const maximized = await getCurrentWindow().isMaximized();
    setIsMaximized(maximized);
  };
  const handleClose = async () => await getCurrentWindow().close();

  return (
    <header
      data-tauri-drag-region
      className="w-full h-12 flex items-center justify-between px-4 bg-[var(--c-surface)] shadow-md select-none"
    >
      <div className="">
        <span className="text-lg font-semibold tracking-widest">Lume</span>
      </div>

      {/* Botões da janela */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleMinimize}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-[var(--c-accentHover)] transition-colors"
          title="Minimizar"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleMaximize}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-[var(--c-accentHover)] transition-colors"
          title={isMaximized ? "Restaurar" : "Maximizar"}
        >
          {!isMaximized ? <Maximize className="w-4 h-4" /> : <Minimize className="w-4 h-4" />}
        </button>
        <button
          onClick={handleClose}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-red-600 transition-colors"
          title="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default LumeHeader;
