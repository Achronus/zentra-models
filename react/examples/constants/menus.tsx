import { IconNavLink, NavLink, ProfileMenuItem } from "@/types/core";
import {
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";

export const NavLinks: NavLink[] = [
  {
    url: "/",
    name: "Dashboard",
    icon: <Home size={24} />,
  },
  {
    url: "#",
    name: "Orders",
    icon: <ShoppingCart size={24} />,
  },
  {
    url: "/dashboard",
    name: "Products",
    icon: <Package size={24} />,
  },
  {
    url: "#",
    name: "Customers",
    icon: <Users size={24} />,
  },
  {
    url: "#",
    name: "Analytics",
    icon: <LineChart size={24} />,
  },
];

export const ProfileMenuItems: ProfileMenuItem[][] = [
  [
    {
      type: "label",
      text: "My Account",
      icon: <User size={16} />,
    },
  ],
  [
    {
      type: "item",
      text: "Settings",
      url: "#",
      icon: <Settings size={16} />,
    },
    {
      type: "item",
      text: "Support",
      url: "#",
    },
  ],
  [
    {
      type: "item",
      text: "Logout",
      url: "#",
    },
  ],
];

export const iconNavLinks: IconNavLink[] = [
  {
    url: "/",
    name: "Dashboard",
    icon: <Home size={20} />,
  },
  {
    url: "/products",
    name: "Orders",
    icon: <ShoppingCart size={20} />,
  },
  {
    url: "#",
    name: "Products",
    icon: <Package size={20} />,
  },
  {
    url: "#",
    name: "Customers",
    icon: <Users size={20} />,
  },
  {
    url: "#",
    name: "Analytics",
    icon: <LineChart size={20} />,
  },
];

export const iconBottomNavLinks: IconNavLink[] = [
  {
    url: "#",
    name: "Settings",
    icon: <Settings size={20} />,
  },
];
