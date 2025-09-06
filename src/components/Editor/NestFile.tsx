import { File } from "lucide-react";
import { Note } from "../../types";
import { useAtom } from "jotai";
import { LumeSelectedArchive } from "../../storage/atom";

const NestFile = ({ note, onSelect }: { note: Note; onSelect: () => void }) => {
  const [selectedArchive, setSelectedArchive] = useAtom(LumeSelectedArchive)

  return (
    <div
      key={note.id}
      onClick={() => {
        onSelect(),
        setSelectedArchive(note.id);
      }}
      className={`flex items-center gap-2 cursor-pointer ${selectedArchive === note.id ? "bg-[var(--c-accent)]/20" : ""} hover:bg-[var(--c-accent)]/20 rounded p-1 transition`}
    >
      <File className="w-4 h-4" />
      <span className="truncate">{note.title}</span>
    </div>
  )
};

export default NestFile;
