import { FilePlus2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useFile from "../../hooks/useFile";

interface NestNewFileProps {
  onCreated?: () => void;
}

const NestNewFile = ({ onCreated }: NestNewFileProps) => {

  const [fileName, setFileName] = useState("");
  const { newFile } = useFile();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const createFile = () => {
    if (fileName.trim() === "") return cancelFile();
    newFile(fileName.trim());
    setFileName("");
    onCreated?.();
  };

  const cancelFile = () => {
    setFileName("");
    onCreated?.();
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer hover:bg-[var(--c-accent)]/20 rounded p-1 transition"
    >
      <FilePlus2 className="w-4 h-4" />
      <div>
        <input
          className="w-40 h-6 border-2 border-[var(--c-accent)] rounded"
          value={fileName}
          onChange={(e) => setFileName(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") createFile();
            if (e.key === "Escape") cancelFile();
          }}
          onBlur={createFile}
        />
      </div>
    </div>
  )
}

export default NestNewFile;
