export type NavLink = {
  name: string;
  url: string;
};

export type ProfileMenuItem = {
  type: "label" | "item";
  text: string;
  url?: string;
};
