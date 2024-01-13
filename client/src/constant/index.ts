import { InboxIcon, HeartIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

export const menuItems = [
    {
      title: "Your profile",
      link: "/profile",
      iconLeft: InboxIcon,
      external: false
    },
    {
      title: "Liked projects",
      link: "/profile/liked",
      iconLeft: HeartIcon,
      external: false
    },
    {
      title: "Settings",
      link: "/settings",
      iconLeft: Cog6ToothIcon,
      external: false
    },
    {
      title: "Feedback",
      link: "mailto:hello@devhunt.app?subject=Devhunt Feedback - [subject]",
      external: true,
      iconRight: true
    },
    {
      title: "Support",
      link: "mailto:hello@devhunt.app?subject=Devhunt Support - [subject]",
      external: true,
      iconRight: true
    }
  ];
  
export const categoryFilters = [
  "Discover",
  "Landing Page",
  "Portfolio",
  "Blog",
  "Entertainment",
  "eCommerce",
  "3D",
  "AI",
  "Machine Learning",
  "Game",
  "Business",
  "Health",
  "Agency",
  "Blockchain",
]