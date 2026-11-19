import classes from "./Navbar.module.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Navbar() {
  return (
    <nav className={classes.nav}>
      <Link to="/">Home</Link>

      <ul>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/register">Register</CustomLink>
        <CustomLink to="/profile">Profile</CustomLink>
        <CustomLink to="/about">About</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({
    path: resolvedPath.pathname,
  });

  return (
    <li className={isActive ? classes.active : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
