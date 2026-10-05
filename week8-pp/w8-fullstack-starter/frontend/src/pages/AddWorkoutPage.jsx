import {useNavigate} from "react-router-dom";

import {useState} from "react";

const AddWorkoutPage = () => {

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);


  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;
  const navigate = useNavigate();

  const addWorkout = async (newWorkout) => {
    try {
      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newWorkout),
      });

      if (!res.ok){
        const data = await res.json();
        console.log("Error", data)
        throw new Error(data.error || data.message || "Failed to add.")
      }
    } catch(error){
      setError(error.message);
      return false;
    }
    return true;
  }

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setError(null);

    const newWorkout = {
      title, difficulty, description, price,
    };

    const res = await addWorkout(newWorkout);
    if (res) {
      navigate("/")
    } else {
      console.log("error, could not add")
    }
  };


  return (
    <div className="create">
      <h2>Add a New Workout</h2>
      <form onSubmit={submitForm}>

        <label>Title:</label>
        <input 
          type="text"
          id="title"
          name="title" 
          required 
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <label>Difficulty:</label>
        <select 
          type="text"
          id="difficulty"
          name="difficulty" 
          required 
          value={difficulty}
          onChange={(e)=>setDifficulty(e.target.value)}>

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
          onChange={(e)=>setDescription(e.target.value)}
        ></textarea>

        <label>Price:</label>
        <input type="number" step="0.01" min="0" required 
          id="price"
          name="price" 
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />
        
        <button>Add Workout</button>
      </form>
    </div>
  );
};

export default AddWorkoutPage;
