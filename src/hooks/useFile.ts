import { open } from '@tauri-apps/plugin-dialog';
import { create, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

import { useAtom } from "jotai";
import { LumeRoute, LumeState } from "../storage/atom";
import { Note } from '../types';


const useFile = () => {

  const [lumeState, setLumeState] = useAtom(LumeState)
  const [route, setRoute] = useAtom(LumeRoute);

  const openFile = async () => {
    const filePath = await open({
      directory: false
    });
    if (!filePath) return;

    const content = await readTextFile(filePath);

    const note: Note = {
      id: crypto.randomUUID(),
      title: filePath.split("\\").pop() ?? "Novo arquivo",
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      path: filePath
    };

    setLumeState({
      nest: null,
      currentFile: note
    })
    setRoute("Editor");
  }

  const newFile = async (fileName: string) => {
    try {
      const path = lumeState.nest?.path;
      if(!path) return;

      const finalPath = path + `/${fileName}`;
      await create(finalPath);
    } catch (err) {
      console.error("Erro ao criar arquivo:", err);
    }
  };


  const fetchFocusedFile = () => lumeState.currentFile;

  const updateFileContent = (c: string) => {
    let file = fetchFocusedFile();
    if(!file) return;

    file.content = c;

    setLumeState({
      nest: lumeState.nest,
      currentFile: file,
    })
  }

  const closeFile = () => {
    setLumeState({
      nest: lumeState.nest,
      currentFile: null
    })
  }

  const saveFile = async (path: string, content: string) => {
    try {
      await writeTextFile(path, content);
    } catch (err) {
      console.error("Erro ao salvar arquivo:", err);
    }
  }

  return {
    openFile,
    fetchFocusedFile,
    updateFileContent,
    newFile,
    closeFile,
    saveFile
  }

}

export default useFile;
