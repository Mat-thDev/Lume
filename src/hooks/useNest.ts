import { open } from '@tauri-apps/plugin-dialog';
import { readDir, readTextFile, mkdir } from '@tauri-apps/plugin-fs';
import { join } from "@tauri-apps/api/path";

import { Nest, NestFolder, Note } from '../types';
import { useAtom } from 'jotai';
import { LumeRoute, LumeSettings, LumeState } from '../storage/atom';


const useNest = () => {

  const [lumeState, setLumeState] = useAtom(LumeState)
  const [route, setRoute] = useAtom(LumeRoute);

  const openNest = async () => {
    const folderPath = await open({
      directory: true
    });
    if (!folderPath) return;

    loadNest(folderPath);
    setRoute("Editor");
  }

  const loadNest = async (path: string) => {
    if (!path) return;
    const nest: Nest = await buildNest(path);
    setLumeState({
      nest,
      currentFile: lumeState.currentFile
    })
  }

  const buildNest = async (path: string) => {
    const nest: Nest = {
      id: crypto.randomUUID(),
      name: path.split("\\").pop() || "Nest",
      path,
      notes: [],
      folders: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const traverse = async (folderPath: string): Promise<NestFolder> => {
      const entries = await readDir(folderPath);
      const folder: NestFolder = {
        id: crypto.randomUUID(),
        name: folderPath.split("\\").pop() || "Folder",
        path: folderPath,
        notes: [],
        subfolders: [],
      };

      for (const entry of entries) {
        const entryPath = join(folderPath, entry.name);

        if (entry.isFile) {
          const content = await readTextFile(await entryPath);
          const note: Note = {
            id: crypto.randomUUID(),
            title: entry.name,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: [],
            path: await entryPath
          };
          folder.notes.push(note);
        } else if (entry.isDirectory) {
          if (entry.name.startsWith(".")) continue;
          const subfolder = await traverse(await entryPath);
          folder.subfolders?.push(subfolder);
        }
      }

      return folder;
    };

    const rootFolder = await traverse(path);
    nest.folders = rootFolder.subfolders;
    nest.notes = rootFolder.notes;

    return nest;
  };

  const fetchNest = () => lumeState.nest;

  const newNestFolder = async (folderName: string) => {
    try {
      const path = lumeState.nest?.path;
      if (!path) return;
      const finalPath = path + `/${folderName}`;
      await mkdir(finalPath, { recursive: true });
    } catch (err) {
      console.error("Erro ao criar pasta:", err)
    }
  }

  const setFocusedFile = (f: Note) => {
    if (!f) return;
    setLumeState({
      nest: lumeState.nest,
      currentFile: f
    })
  }

  const closeNest = () => {
    setLumeState({
      nest: null,
      currentFile: null
    })
    setRoute("Home")
  }

  return {
    openNest,
    loadNest,
    fetchNest,
    setFocusedFile,
    newNestFolder,
    closeNest
  }
}

export default useNest;
