export type themes = "dark" | "light" | "oled";
export type routes = "Home" | "Editor" | "Settings";
export type NestFileType = { id: string; name: string; type: "file" | "folder"; children?: NestFileType[] };

export type GeneralContainerProps = {
  children: React.ReactNode;
  id?: string;
  theme: themes;
  customStyle?: string;
}

export type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  route: routes;
  active?: boolean;
};

export type  ThemePreviewProps = {
  label: string;
  theme: themes;
  selected: boolean;
  onSelect: () => void;
}


export type lumeState = {
  nest: Nest | null;
  currentFile: Note | null;
}

export type lumeSettings = {
  appearance: {
    themeMode: themes
  },
  editor: {
    autoSave: boolean;
    autoSaveInterval: number;
    showLineNumbers: boolean;
  }
  general: {
    startOnBoot: boolean;
  }
}

export type user = {
  username: ""
  profilePicture?: ""
}

export type NestSidebarProps = {
  nest: Nest | null;
  onSelectFile: (note: Note) => void;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  backlinks?: string[];
  versionHistory?: NoteVersion[];
  path: string;
}

export type NoteVersion = {
  versionId: string;
  content: string;
  updatedAt: string;
}

export type Nest = {
  id: string;
  name: string;
  path: string;
  notes: Note[];
  folders?: NestFolder[];
  createdAt: string;
  updatedAt: string;
}

export type NestFolder = {
  id: string;
  name: string;
  path: string;
  notes: Note[];
  subfolders?: NestFolder[];
}
