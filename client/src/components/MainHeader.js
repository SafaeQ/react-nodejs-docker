import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("http://localhost/owner/logout", {
          method: "POST",
          credentials: "include",
        });
        if (response.ok === true) {
          Swal.fire("Logout!", "You are logged out!", "success");
          props.onLogout("false");
          navigate("/login");
        } else {
          const response2 = await fetch("http://localhost/customer/logout", {
            method: "POST",
            credentials: "include",
          });
          const result2 = await response2.json();
          if (response2.ok === true) {
            Swal.fire("Logout!", "You are logged out!", "success");
            props.onLogout("false");
            navigate("/login");
          } else {
            const response2 = await fetch("http://localhost/admin/logout", {
              method: "POST",
              credentials: "include",
            });
            const result2 = await response2.json();
            if (response2.ok === true) {
              Swal.fire("Logout!", "You are logged out!", "success");
              props.onLogout("false");
              navigate("/login");
            } else {
              alert(result.output);
            }
          }
        }
      }
    });
  };
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to="/welcome"
            >
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to="/about"
            >
              About
            </NavLink>
          </li>
          {props.isAuth == "false" && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : ""
                }
                to="/sign-up"
              >
                SignUp
              </NavLink>
            </li>
          )}
          {props.isAuth == "false" && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : ""
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
          )}
          {props.isAuth == "true" && (
            <li>
              <a href="javascript:void(0)" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          )}
          {props.isAuth == "true" && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : ""
                }
                to="/profile"
              >
                profile
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
