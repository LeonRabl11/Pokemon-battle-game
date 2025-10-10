import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-white">
      <div className="navbar-start">
        <Link
          className="text-red-500
    font-bold
    text-2xl
    tracking-wider
    drop-shadow-2xl
    uppercase
    hover:scale-110
    transition-transform duration-300
    text-center
    ml-[1rem]
        "
          style={{ fontFamily: "'Fredoka One', sans-serif" }}
          to="/"
        >
          Pokemon Battle
        </Link>
      </div>
      <nav className="navbar-end">
        <ul className="menu menu-horizontal items-baseline gap-2 text-black">
          <Link className="btn btn-primary" to="/signin">
            <li>Sign In</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
