export interface MenuItem {
  title: string;
  filePath?: string;
  children?: MenuItem[];
}

export interface MenuData {
  menuItems: MenuItem[];
}