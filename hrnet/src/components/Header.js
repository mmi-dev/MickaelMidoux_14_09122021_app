import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-item" to="./">
          <i className="fa fa-user-circle"></i>
          <span>Home</span>
        </Link>
        <Link className="main-nav-item" to="./employees">
          <i className="fa fa-user-circle"></i>
          <span>View Curent Employees</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
