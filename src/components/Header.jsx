import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ setIsLoggedIn, name }) => {
  const navigate = useNavigate();
  const links = [
    {
      linkpath: "/",
      linkname: "Dashboard",
    },

    {
      linkpath: "/interview",
      linkname: "Interview Question",
    },

    {
      linkpath: "/problem",
      linkname: "Problem Solving",
    },

    {
      linkpath: "/machine",
      linkname: "Machine Coding",
    },

    {
      linkpath: "/uiprac",
      linkname: "UI Practice",
    },

    {
      linkpath: "/quiz",
      linkname: "Quiz",
    },

    {
      linkpath: "/user",
      linkname: "User Data",
    },
  ];
  return (
    <header className="header">
      {links.map((item, id) => {
        return (
          <NavLink className="navlink" key={id} to={item.linkpath}>
            {item.linkname}
          </NavLink>
        );
      })}
      <p className="navlink">{name}</p>
      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
