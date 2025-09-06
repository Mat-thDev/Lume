import { useState } from "react";
import { FilePlus, FolderPlus, RefreshCcw, CopyMinus, X } from "lucide-react";

import { NestSidebarProps } from "../../types";
import LumeNestFolder from "./NestFolder";
import NestFile from "./NestFile";
import NestNewFolder from "./NestNewFolder";
import { useAtomValue } from "jotai";
import { EditorSidebarCollapsed } from "../../storage/atom";
import useNest from "../../hooks/useNest";
import useNestWatcher from "../../hooks/useNestWatcher";
import NestNewFile from "./NestNewFile";

const NestSidebar = ({ nest, onSelectFile }: NestSidebarProps) => {
  const collapsed = useAtomValue(EditorSidebarCollapsed);
  const { closeNest } = useNest();
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [showNewFileInput, setShowNewFileInput] = useState(false);

  useNestWatcher(nest?.path ?? "");

  if (!nest) return null;

  return (
    <div className={`${collapsed ? "w-0" : "w-56"} border-r border-[var(--c-border)] bg-[var(--c-surface)] flex flex-col`}>
      <aside
        className={`h-full flex flex-col justify-between transition-all duration-300 overflow-hidden`}
      >
        {/* Header */}
        <div className="p-3 font-semibold text-[var(--c-primary)] border-b border-[var(--c-border)]">
          Explorer
        </div>

        {/* Conteúdo */}
        <div className="flex-1 p-3 overflow-y-auto">
          {!collapsed && (
            <div className="font-semibold mb-3 truncate text-sm text-[var(--c-primary)]">
              {nest.name}
            </div>
          )}

          {/* Input para nova pasta */}
          {showNewFolderInput && (
            <NestNewFolder onCreated={() => setShowNewFolderInput(false)} />
          )}

          {nest.folders?.map((folder) => (
            <LumeNestFolder
              key={folder.id}
              folder={folder}
              onSelectFile={() => onSelectFile}
            />
          ))}


          {showNewFileInput && (
            <NestNewFile onCreated={() => setShowNewFileInput(false)} />
          )}

          {nest.notes.map((note) => (
            <NestFile key={note.id} note={note} onSelect={() => onSelectFile(note)} />
          ))}

          {nest.folders?.length === 0 && nest.notes.length === 0 && !showNewFolderInput && (
            <p className="text-xs text-[var(--c-secondary)] italic">Pasta vazia</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-around border-t border-[var(--c-border)] p-2">
          <button
            title="Novo arquivo"
            className="p-2 rounded hover:bg-[var(--c-accent)]/20 transition"
            onClick={() => setShowNewFileInput(true)}
          >
            <FilePlus className="w-5 h-5" />
          </button>

          <button
            title="Nova pasta"
            className="p-2 rounded hover:bg-[var(--c-accent)]/20 transition"
            onClick={() => setShowNewFolderInput(true)}
          >
            <FolderPlus className="w-5 h-5" />
          </button>

          <button
            title="Recarregar Nest"
            className="p-2 rounded hover:bg-[var(--c-accent)]/20 transition"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>

          <button
            title="Colapsar pastas"
            className="p-2 rounded hover:bg-[var(--c-accent)]/20 transition"
          >
            <CopyMinus className="w-5 h-5" />
          </button>

          <button
            title="Fechar Nest"
            className="p-2 rounded hover:bg-[var(--c-accent)]/20 transition"
            onClick={() => closeNest()}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </div>
  );
};

export default NestSidebar;
