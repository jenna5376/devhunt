import { InboxIcon, HeartIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

export const menuItems = [
    {
      title: "My portfolio",
      link: "/",
      iconLeft: InboxIcon,
      external: false
    },
    {
      title: "Liked projects",
      link: "/",
      iconLeft: HeartIcon,
      external: false
    },
    {
      title: "Settings",
      link: "/",
      iconLeft: Cog6ToothIcon,
      external: false
    },
    {
      title: "Feedback",
      link: "/",
      external: true
    },
    {
      title: "Support",
      link: "/",
      external: true
    },
    {
      title: "Sign Out",
      link: "/",
      external: true
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