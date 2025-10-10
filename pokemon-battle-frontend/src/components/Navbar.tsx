import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-white">
      <div className="navbar-start">
        <Link
          className="
    text-red-500
    text-3xl
    uppercase
    font-bold
    tracking-wider
    drop-shadow-2xl
    transition-transform duration-300
    text-center
  "
          style={{
            fontFamily: "'Luckiest Guy', cursive",
            WebkitTextStroke: "1px #000080",
          }}
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
