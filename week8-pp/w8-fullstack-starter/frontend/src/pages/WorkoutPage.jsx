import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const WorkoutPage = ({ isAuthenticated }) => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const deleteWorkout = async (id) => {
    try {
      const res = await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete workout");
      }

      return true;
    } catch (error) {
      console.log("Error")
      return false;
    }
  };

  const deletingWorkout = async () => {
    const popup = window.confirm("Delete?");

    if (popup) {
      const result = await deleteWorkout(id);

      if (result) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch(`/api/workouts/${id}`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setWorkout(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error: {error}</p>
  ) : (
    workout && (
      <div>
        <h2>{workout.title}</h2>
        <p>Difficulty: {workout.difficulty}</p>
        <p>Description: {workout.description}</p>
        <p>Price: {workout.price}</p>

        <button onClick={() => navigate("/")}>Back</button>

        {isAuthenticated && (
          <>
            <button onClick={deletingWorkout}>Delete</button>
            <button onClick={() => navigate(`/edit/${workout._id}`)}>
              Edit
            </button>
          </>
        )}
      </div>
    )
  );
};

export default WorkoutPage;