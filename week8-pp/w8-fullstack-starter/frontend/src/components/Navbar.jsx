import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {

  const handleClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user")
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Workout</h1>
      </Link>
      <div className="links">

        {isAuthenticated && (
          <div>
            <Link to="/add-workout">Add Workout</Link>
          
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
