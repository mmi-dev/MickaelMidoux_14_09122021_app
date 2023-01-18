import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { HomeRounded, VisibilityRounded } from "@mui/icons-material";

function Header() {
  const location = useLocation();

  return (
    <header>
      <nav className="main-nav">
        {location.pathname === "/" ? (
          <Link className="main-nav-item" to="./employees">
            <Button startIcon={<VisibilityRounded />}>
              View Curent Employees
            </Button>
          </Link>
        ) : (
          <Link className="main-nav-item" to="./">
            <Button startIcon={<HomeRounded />}>Home</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
