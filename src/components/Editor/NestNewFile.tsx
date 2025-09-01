import { FilePlus2 } from "lucide-react";
import { useState } from "react";
import useNest from "../../hooks/useNest";


const NestNewFile = () => {

  const [folderName, setFolderName] = useState("");

  const { newNestFolder } = useNest();

  return (
    <div
      className="flex items-center gap-2 cursor-pointer hover:bg-[var(--c-accent)]/20 rounded p-1 transition"
    >
      <FilePlus2 className="w-4 h-4" />
      <div>
        <input
          className="w-40 h-6 border-2 border-[var(--c-accent)] rounded"
          value={folderName}
          onChange={(e) => setFolderName(e.currentTarget.value)}
          onSubmit={() => newNestFolder(folderName)}
        />
      </div>
    </div>
  )
}

export default NestNewFile;
