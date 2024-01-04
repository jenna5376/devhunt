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
      link: "/profile",
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
      link: "/",
      external: true,
      iconRight: true
    },
    {
      title: "Support",
      link: "/",
      external: true,
      iconRight: true
    }
  ];
  
export const categoryFilters = [
  "Discover",
  "Frontend",
  "Backend",
  "Full-Stack",
  "Mobile",
  "UI/UX",
  "Game Dev",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Blockchain",
  "E-commerce",
  "Chatbots"
]