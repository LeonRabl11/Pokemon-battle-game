import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-white via-orange-200 to-yellow-200 shadow-md">
    
      <div className="navbar-start">
  <Link
    to="/"
    className="
      text-red-500
      text-3xl
      uppercase
      font-bold
      tracking-wider
      drop-shadow-2xl
      transition-transform
      duration-300
      text-center
      hover:scale-110
      ml-[1rem]
    "
    style={{
      fontFamily: "'Fredoka One', sans-serif",
      WebkitTextStroke: "1px #000080",
    }}
  >
          Pokemon Battle
        </Link>
      </div>

      {token && (
        <div className="navbar-end flex items-center gap-4 mr-4">

          <Link
            to="/leaderboard"
            className="text-gray-700 font-medium hover:text-red-500 transition-colors"
          >
            Leaderboard
          </Link>

          <button
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
