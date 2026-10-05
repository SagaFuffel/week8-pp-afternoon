import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// pages & components
import Home from "./pages/HomePage";
import AddWorkoutPage from "./pages/AddWorkoutPage";
import WorkoutPage from "./pages/WorkoutPage";
import EditWorkoutPage from "./pages/EditWorkoutPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState (()=> {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token? true : false;
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar 
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-workout" element={isAuthenticated ? <AddWorkoutPage /> : <Navigate to="/signup" />} />
            <Route path="/workouts/:id" element={<WorkoutPage />} />
            <Route path="/edit-workout/:id" element={isAuthenticated ? <EditWorkoutPage /> : <Navigate to="/signup"/>} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />}/>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
