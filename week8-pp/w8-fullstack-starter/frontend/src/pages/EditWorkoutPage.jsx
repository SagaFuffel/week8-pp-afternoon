import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
 

const EditWorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await fetch(`/api/workouts/${id}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setTitle(data.title);
      setDifficulty(data.difficulty);
      setDescription(data.description);
      setPrice(data.price);
    };
    fetchWorkout();
  }, [id]);

  const updateWorkout = async (workout) => {
    try {
      const res = await fetch(`/api/workouts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workout),
      });
      if (!res.ok) throw new Error("Failed to update workout");
      return true;
    } catch (error) {
      console.log("Error updating workout:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const updatedWorkout = {
      title,
      difficulty,
      description,
      price,
    };
    const success = await updateWorkout(updatedWorkout);
    if (success) {
      navigate(`/workouts/${id}`);
    }
  };

  return (
    <div className="create">
      <h2>Update Workout</h2>
      <form onSubmit={submitForm}>
        <label>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Difficulty:</label>
        <select
          type="text"
          id="difficulty"
          name="difficulty"
          required
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}>

          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Description:</label>
        <textarea
          type="text"
          id="description"
          name="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Price:</label>
        <input type="number" step="0.01" min="0" required
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button>Done</button>
      </form>
    </div>
  );
};



export default EditWorkoutPage;

