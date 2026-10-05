
import {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

const WorkoutPage = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const deleteWorkout = async () => {

    try {
      const response = await fetch (`/api/workouts/${id}`, {
        method : "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`
        }

      });

      if (!response.ok) 
        throw new Error ("Failed to delete workout");
    } catch (error) {
      console.error(error);
    }

};

useEffect (() => {
  const fetchWrokout = async () => {
    try {
      const response = await fetch (`/api/workouts/${id}`);

      if (!response.ok) 
        throw new Error ("Network response was not ok");

      const data = await response.json ();
      setWorkout(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchWrokout();
}, [id]);

const handleDelete = async (workoutId) => {
  const confirmation = window.confirm("Are you sure to delete?");

  if (!confirmation) return;

  await deleteWorkout(workoutId);
  navigate ("/");
}


  return (
    <div className="workout-preview">

      {loading ? (<p>Loading...</p>) :
      error ? (<p>{error}</p>) : (
        <>
        <h2>{workout.title}</h2>

        <p>title: {workout.title}</p>
        <p>difficulty: {workout.difficulty}</p>
        <p>description: {workout.description}</p>
        <p>price: {workout.price}</p>

        <button onClick = {()=> handleDelete(workout._id)}>delete</button>
        <button onClick = {() => navigate (`/edit-workout/${workout._id}`)}>Edit</button>
        
        </>
      )}
      
    </div>
  );
};

export default WorkoutPage;
