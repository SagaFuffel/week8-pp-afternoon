
import { useState } from "react";
import { useNavigate} from "react-router-dom";

const AddWorkoutPage = () => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState ("Beginner");
  const [description, setDescription] = useState ("");
  const [price, setPrice] = useState ("");
  const [error, setError] = useState (null);
  const [pending, setPending] = useState (true);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const AddWorkout = async (newWorkout) => {
    try {
      const response = await fetch ("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newWorkout)
      });

      if (!response.ok) {
        throw new Error ("Failed to add new workout")
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const newWorkout = {
      title,
      difficulty,
      description,
      price
    };

    await AddWorkout(newWorkout);
    console.log(newWorkout);
    navigate ("/");
  };

  return (
    <div className="create">
      <h2>Add a New Workout</h2>
      <form onSubmit={submitForm}>

        <label>Title:</label>
        <input type="text" 
        required
        onChange = {(e) => setTitle(e.target.value)} 
        />

        <label>Difficulty:</label>
        <select type = "text" onChange = {(e) => setDifficulty(e.target.value)}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Description:</label>
        <textarea required onChange = {(e) => setDescription(e.target.value)}></textarea>

        <label>Price:</label>
        <input type="number" step="0.01" min="0" 
        required
        onChange = {(e) => setPrice(e.target.value)} />
        
        <button>Add Workout</button>
      </form>
    </div>
  );
};

export default AddWorkoutPage;
