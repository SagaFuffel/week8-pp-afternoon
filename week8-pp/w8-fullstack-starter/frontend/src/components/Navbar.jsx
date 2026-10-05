import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleClick = () => {
    // setIsAuthenticated(false);
    localStorage.removeItem("user");
    window.location("/");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Workout</h1>
      </Link>

      <div className="links">

        {user && (
      
          <div>
            <Link to="/add-workout">Add Product</Link>
            <span>{user.username}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}

        {!user && (
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

