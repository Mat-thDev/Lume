import { Notebook, Home, Settings } from "lucide-react";
import { SidebarItemProps } from "../../types";
import useRoutes from "../../hooks/useRoutes";

const LumeSidebar = () => {

  const { activeRoute } = useRoutes();

  return (
    <aside className="w-16 h-full flex flex-col justify-end items-center py-6 bg-[var(--c-surface)]">
      <div className="flex flex-col gap-4">
        <LumeSidebarItem icon={Home} label="Início" route="Home" active={activeRoute() === "Home"} />
        <LumeSidebarItem icon={Notebook} label="Notas" route="Notes" active={activeRoute() === "Notes"} />
        <LumeSidebarItem icon={Settings} label="Configurações" route="Settings" active={activeRoute() === "Settings"} />
        {/* <LumeSidebarUserIcon username={"Misaki"} /> */}
      </div>
    </aside>
  );
};

// const LumeSidebarUserIcon = ({ username }: { username: string }) => {
//   const firstLetter = username[0].toUpperCase();

//   return (
//     <button
//       className="w-10 h-10 rounded-xl bg-[var(--c-accent)]/15 flex items-center justify-center shadow-md
//       text-[var(--c-secondary)] font-bold text-xl hover:scale-105 hover:bg-[var(--c-accent)]/25 transition-transform"
//       title={username}
//     >
//       {firstLetter}
//     </button>
//   );
// };

const LumeSidebarItem = ({ icon, label, route, active }: SidebarItemProps) => {

  const { changeRoute } = useRoutes();

  const Icon = icon;

  return (
    <button
      className={`
        relative group flex items-center justify-center p-3 rounded-xl
        transition-colors duration-200
        ${active ? "bg-[var(--c-accent)] text-white" : "text-[var(--c-primary)] hover:bg-[var(--c-accent)]/20"}
      `}
      onClick={() => changeRoute(route)}
    >
      <Icon className="w-5 h-5" />
      {/* Tooltip */}
      <span
        className="absolute left-14 px-2 py-1 rounded-md bg-[var(--c-surface)] text-sm text-[var(--c-primary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-99"
      >
        {label}
      </span>
    </button>
  );
};

export default LumeSidebar;
