import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  let nav = props.user ? (
    <div>
      <Link to="/" className="NavBar-link">
        HOME
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/favorites" className="NavBar-link">
        FAVORITES
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/games" className="NavBar-link">
        GAMES
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="" className="NavBar-link" onClick={props.handleLogout}>
        LOG OUT
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className="NavBar-hello">HELLO, {props.user.name}</span>
    </div>
  ) : (
    <div>
      <Link to="/" className="NavBar-link">
        HOME
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/games" className="NavBar-link">
        GAMES
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/signup" className="NavBar-link">
        SIGN UP
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link className="btn btn-danger" style={{ margin: "0 10px" }} to="/login">
        LOG IN
      </Link>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
