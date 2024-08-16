export type NavLink = {
  name: string;
  url: string;
  icon?: React.ReactNode;
};

export type IconNavLink = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

export type ProfileMenuItem = {
  type: "label" | "item";
  text: string;
  url?: string;
  icon?: React.ReactNode;
};
