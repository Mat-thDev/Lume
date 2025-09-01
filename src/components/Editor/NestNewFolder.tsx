import { FolderClosed } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useNest from "../../hooks/useNest";

interface NestNewFolderProps {
  onCreated?: () => void;
}

const NestNewFolder = ({ onCreated }: NestNewFolderProps) => {
  const [folderName, setFolderName] = useState("");
  const { newNestFolder } = useNest();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const createFolder = () => {
    if (folderName.trim() === "") return cancelFolder();
    newNestFolder(folderName.trim());
    setFolderName("");
    onCreated?.();
  };

  const cancelFolder = () => {
    setFolderName("");
    onCreated?.();
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer hover:bg-[var(--c-accent)]/20 rounded p-1 transition">
      <FolderClosed className="w-4 h-4" />
      <input
        ref={inputRef}
        className="w-40 h-6 border-2 border-[var(--c-accent)] rounded px-1"
        value={folderName}
        onChange={(e) => setFolderName(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") createFolder();
          if (e.key === "Escape") cancelFolder();
        }}
        onBlur={createFolder}
      />
    </div>
  );
};

export default NestNewFolder;
