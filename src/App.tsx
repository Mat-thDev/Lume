"use client"

import { ComponentType, useEffect, useState } from "react";
import "./App.css";
import GeneralContainer from "./components/General/GeneralContainer";
import LumeHeader from "./components/Lume/Header";
import LumeSidebar from "./components/Lume/Sidebar";
import LumeHome from "./components/Routes/Home";
import useRoutes from "./hooks/useRoutes";
import { routes } from "./types";
import LumeSettings from "./components/Routes/Settings";
import useSettings from "./hooks/useSettings";
import LumePreloader from "./components/Lume/Preloader";
import LumeEditor from "./components/Routes/Editor/page";

const RoutesPage = {
  "Home": LumeHome,
  "Editor": LumeEditor,
  "Settings": LumeSettings,
} as Record<routes, ComponentType>

function App() {

  const [loading, setLoading] = useState(true);
  const { appTheme } = useSettings();
  const { activeRoute } = useRoutes();
  const CurrentPage = RoutesPage[activeRoute()];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <LumePreloader />;

  return (
    <GeneralContainer
      id="lumiapp"
      customStyle="w-screen h-screen bg-[var(--c-surface)] text-[var(--c-primary)] flex flex-col"
      theme={appTheme()}
    >
      <LumeHeader />

      <div className="flex flex-1 overflow-hidden">
        <LumeSidebar />
        <main className="flex-1 h-full overflow-auto relative border-l border-t border-[var(--c-border)] rounded-tl-xl bg-[var(--c-background)]">
          <CurrentPage />
        </main>
      </div>
    </GeneralContainer>
  );
}

export default App;
