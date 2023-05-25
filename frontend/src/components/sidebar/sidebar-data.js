import { AiFillHome } from "react-icons/ai";
import { MdOutlineAccountBox } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";

export const sidebarData = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <AiFillHome />,
    cName: "sidebar-menu-text",
  },
  {
    title: "All Jobs",
    path: "/jobs",
    icon: <FaList />,
    cName: "sidebar-menu-text",
  },
  {
    title: "Add Job",
    path: "/job",
    icon: <CgFileDocument />,
    cName: "sidebar-menu-text",
  },
  {
    title: "Account",
    path: "/account",
    icon: <MdOutlineAccountBox />,
    cName: "sidebar-menu-text",
  },
  {
    title: "Security",
    path: "/password",
    icon: <RiLockPasswordLine />,
    cName: "sidebar-menu-text",
  },

];
