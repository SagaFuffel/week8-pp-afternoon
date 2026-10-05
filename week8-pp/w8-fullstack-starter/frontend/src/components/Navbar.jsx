import { Link } from "react-router-dom";

const Navbar = ({isAuthenticated, setIsAuthenticated}) => {

  const handleClick = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Workout</h1>
      </Link>

      <div className="links">

        {isAuthenticated && (
      
          <div>
            <Link to="/add-workout">Add Product</Link>
            <span>{JSON.parse(localStorage.getItem("user")).username}</span>
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

