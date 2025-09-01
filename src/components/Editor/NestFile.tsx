import { File } from "lucide-react";
import { Note } from "../../types";

const NestFile = ({ note, onSelect }: { note: Note; onSelect: () => void }) => (
  <div
    key={note.id}
    onClick={onSelect}
    className="flex items-center gap-2 cursor-pointer hover:bg-[var(--c-accent)]/20 rounded p-1 transition"
  >
    <File className="w-4 h-4" />
    <span className="truncate">{note.title}</span>
  </div>
);

export default NestFile;
