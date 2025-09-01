import { useAtom, useAtomValue } from "jotai";
import { autoSaveSaving, EditorSidebarCollapsed } from "../../storage/atom";
import { Columns2, PanelLeftClose, PanelLeftOpen, Save, File, Folder, X } from "lucide-react";
import useFile from "../../hooks/useFile";
import useNest from "../../hooks/useNest";
import { Note } from "../../types";

const EditorHeader = ({ file }: { file: Note | null }) => {

  const [collapsed, setCollapsed] = useAtom(EditorSidebarCollapsed)
  const { openNest, fetchNest } = useNest();
  const { openFile, closeFile, saveFile } = useFile();

  const saving = useAtomValue(autoSaveSaving);


  return (
    <div className="h-10 border-l border-b border-[var(--c-border)] flex items-center justify-between px-4">
      <div>
        <span className="font-medium">{file?.title ?? "Selecione um arquivo ou abra um Nest para começar."}</span>
      </div>

      {saving && (
        <div>
          <span className="font-medium animate-pulse">Salvando</span>
        </div>
      )}

      {file ? (
        <div className="flex gap-2">
          <EditorHeaderItem onClick={() => setCollapsed(!collapsed)} visible={!!fetchNest()}>
            {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </EditorHeaderItem>
          <EditorHeaderItem onClick={() => saveFile(file.path, file.content)} visible>
            <Save className="w-4 h-4" />
          </EditorHeaderItem>
          <EditorHeaderItem onClick={() => setCollapsed(!collapsed)} visible>
            <Columns2 className="w-4 h-4" />
          </EditorHeaderItem>
          <EditorHeaderItem onClick={() => closeFile()} visible>
            <X className="w-4 h-4" />
          </EditorHeaderItem>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 rounded hover:bg-[var(--c-accent)]/20 transition"
            onClick={() => openFile()}
          >
            <File className="w-4 h-4" />
          </button>
          <button
            className="px-2 py-1 rounded hover:bg-[var(--c-accent)]/20 transition"
            onClick={() => openNest()}
          >
            <Folder className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  )
}

const EditorHeaderItem = ({ children, onClick, visible }: { children: React.ReactNode, onClick: () => void, visible: boolean }) => {

  if (!visible) return;

  return (
    <button
      className="px-2 py-1 rounded hover:bg-[var(--c-accent)]/20 transition"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default EditorHeader;
