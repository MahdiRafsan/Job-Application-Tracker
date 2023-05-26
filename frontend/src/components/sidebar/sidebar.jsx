import { useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../features/auth/authSlice";
import { sidebarData } from "./sidebar-data";

import defaultImage from "../../assets/default_image.jpg";

import "./sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);
  const {
    username,
    profile: { firstName, lastName, image: { url } = {} } = {},
  } = loggedInUser;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className="body-container">
      <div className="sidebar-body">
        <div className={sidebar ? "sidebar-menu open" : "sidebar-menu"}>
          <ul className="sidebar-menu-items">
            <li>
              <button onClick={showSidebar} className="toggle-button">
                <FaBars />
              </button>
              <span className={sidebar ? "header open" : "header"}>
                Job Trek
              </span>
            </li>
            <li>
              <img
                src={url || defaultImage}
                alt="profile"
                className={sidebar ? "profile-image open" : " profile-image "}
              />
              <h4 className={sidebar ? "profile-name open" : " profile-name "}>
                {firstName || lastName ? `${firstName} ${lastName}` : username}
              </h4>
            </li>
            {sidebarData.map((el, idx) => {
              return (
                <li key={idx}>
                  <NavLink
                    to={el.path}
                    end
                    className={
                      sidebar ? "sidebar-menu-link open" : "sidebar-menu-link"
                    }
                    activeclassname="active"
                  >
                    <span className="icons">{el.icon}</span>
                    <span
                      className={
                        sidebar ? `${el.cName} open` : "sidebar-menu-text"
                      }
                    >
                      {el.title}
                    </span>
                  </NavLink>
                </li>
              );
            })}
            <li
              onClick={logoutHandler}
              className={
                sidebar ? "sidebar-menu-link open" : "sidebar-menu-link"
              }
              activeclassname="active"
            >
              <span className="icons">
                <FaSignOutAlt />
              </span>
              <span
                className={
                  sidebar ? "sidebar-menu-text open" : "sidebar-menu-text"
                }
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
        <div className={sidebar ? "main-content open" : "main-content"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
