import { IconCardSection } from "@/components/zentra/IconCard";
import { IconCardType } from "@/types/card";
import { Heart, Link, PanelsTopLeft } from "lucide-react";

export const FeaturedCards: IconCardType[] = [
  {
    title: "API Craftsman",
    desc: "Keeping API's clean, efficient, scalable, and maintainable.",
    icon: <Link size={24} strokeWidth={1.5} />,
    styles: {
      iconContainer: "bg-amber-900",
    },
  },
  {
    title: "Detail Oriented",
    desc: "Awareness to ease of access, accessibility, and a seamless UX.",
    icon: <Heart size={24} strokeWidth={1.5} fill="white" />,
    styles: {
      iconContainer: "bg-pink-900",
    },
  },
  {
    icon: <PanelsTopLeft size={24} strokeWidth={1.5} />,
    title: "Intuitive Interfaces",
    desc: "Turning JSON data into clear, interactive interfaces.",
    styles: {
      iconContainer: "bg-sky-900",
    },
  },
];

export default function IconCardsDemo() {
  return <IconCardSection cards={FeaturedCards} />;
}
