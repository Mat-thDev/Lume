export type themes = "dark" | "light" | "oled";
export type routes = "Home" | "Notes" | "Settings";

type GeneralContainerProps = {
  children: React.ReactNode;
  id?: string;
  theme?: themes;
  customStyle?: string;
}

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  route: routes;
  active?: boolean;
};
