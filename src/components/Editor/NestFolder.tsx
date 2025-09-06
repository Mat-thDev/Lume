import { useState } from "react";
import { Folder, FolderOpen, ChevronRight, ChevronDown } from "lucide-react";
import NestFile from "./NestFile";
import { NestFolder, Note } from "../../types";
import { useAtom } from "jotai";
import { LumeSelectedArchive } from "../../storage/atom";

const LumeNestFolder = ({ folder, onSelectFile, depth = 0 }: { folder: NestFolder; onSelectFile: (note: Note) => void; depth?: number }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedArchive, setSelectedArchive] = useAtom(LumeSelectedArchive)

  return (
    <div key={folder.id} style={{ paddingLeft: depth * 2 }}>
      <div
        className={`flex items-center gap-2 cursor-pointer ${selectedArchive === folder.id ? "bg-[var(--c-accent)]/20" : ""} hover:bg-[var(--c-accent)]/20 rounded p-1 transition`}
        onClick={() => {
          setCollapsed(!collapsed)
          setSelectedArchive(folder.id);
        }}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 opacity-70" />
        ) : (
          <ChevronDown className="w-4 h-4 opacity-70" />
        )}
        {collapsed ? (
          <Folder className="w-4 h-4" />
        ) : (
          <FolderOpen className="w-4 h-4 text-[var(--c-accent)]" />
        )}
        <span className="truncate">{folder.name}</span>
      </div>

      {!collapsed && (
        <div className="ml-4">
          {folder.subfolders?.map((sub) => (
            <LumeNestFolder
              key={sub.id}
              folder={sub}
              onSelectFile={onSelectFile}
              depth={depth + 1}
            />
          ))}
          {folder.notes.map((note: Note) => (
            <NestFile
              key={note.id}
              note={note}
              onSelect={() => onSelectFile(note)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LumeNestFolder;
