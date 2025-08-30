import { Loader2Icon } from "lucide-react";
import GeneralContainer from "../General/GeneralContainer";
import useSettings from "../../hooks/useSettings";

const LumePreloader = () => {

  const { appTheme } = useSettings();

  return (
    <GeneralContainer
      theme={appTheme()}
      customStyle="w-screen h-screen bg-[var(--c-background)] text-[var(--c-primary)] overflow-hidden"
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center"
        data-tauri-drag-region
      >
        <h1 className="text-5xl font-bold tracking-tight animate-pulse">
          Lume
        </h1>
        <p className="mt-4 text-lg opacity-70 animate-pulse">
          Melhorando sua experiência...
        </p>
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-3">
        <Loader2Icon className="w-8 h-8 animate-spin" />
        <span className="text-sm opacity-60 animate-pulse">Iniciando...</span>
      </div>
    </GeneralContainer>
  );
};

export default LumePreloader;
