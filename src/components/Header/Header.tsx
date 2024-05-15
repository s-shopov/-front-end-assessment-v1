import React, { Fragment } from "react";
import { Link } from "react-router-dom";
type HeaderProps = {
  name: string;
};
const Header: React.FC<HeaderProps> = ({ name }) => (
  <Fragment>
    <div className="d-flex align-items-center justify-content-between">
      <h2 className="h3">{name}</h2>
      <Link to="/add">Add product</Link>
    </div>
    <hr />
  </Fragment>
);

export default Header;
