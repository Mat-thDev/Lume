import { useEffect } from "react";
import { useSetAtom } from "jotai";
import useSettings from "./useSettings";
import { autoSaveSaving } from "../storage/atom";
import useFile from "./useFile";

const useAutoSave = () => {
  const { fetchSettings } = useSettings();
  const settings = fetchSettings();
  const { autoSave, autoSaveInterval } = settings.editor;
  const setSaving = useSetAtom(autoSaveSaving);
  const { fetchFocusedFile, saveFile } = useFile();

  const file = fetchFocusedFile();

  useEffect(() => {
    if (!autoSave || !file) return;

    const interval = setInterval(() => {
      setSaving(true);
      saveFile(file.path, file.content).finally(() => setSaving(false));
    }, autoSaveInterval * 1000);

    return () => clearInterval(interval);
  }, [autoSave, autoSaveInterval, file]);
};

export default useAutoSave;
