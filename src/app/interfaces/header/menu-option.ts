interface SubMenuItem {
  label: string;
  iconName: string;
  badge?: string;
}
interface MenuOption {
  label: string;
  subItems?: SubMenuItem[];
}