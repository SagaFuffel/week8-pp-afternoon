
import {useParams, useNavigate }  from "react-router-dom";
import { useState, useEffect } from "react";

const EditWorkoutPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState ("");
  const [difficulty, setDifficulty] = useState ("Beginner");
  const [description, setDescription] = useState ("");
  const [price, setPrice] = useState ("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect (() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch (`/api/workouts/${id}`);
        const data = await response.json();

        setTitle(data.title);
        setDifficulty(data.difficulty);
        setDescription(data.description);
        setPrice(data.price);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkout();
  }, [id]);

  const updateWorkout = async (workout) => {
    try {
      const res = await fetch (`/api/workouts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(workout),
      }
      );

      if (!res.ok) {
        throw new Error ("Failed to update workout");
      }
    } catch (error) {
      console.error (error);
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault ();

    const updatedWorkout = {
      title,
      difficulty,
      description,
      price
    }
    await updateWorkout(updatedWorkout);
    navigate (`/workouts/${id}`);
  };

  

  return (
    <div className="create">
      <h2>Update Workout</h2>
      <form onSubmit = {submitForm}>
        <label>Workout title: </label>
        <input
        type = "text"
        value = {title}
        onChange = {(e) => setTitle (e.target.value)}
        />
    
        <label>Difficulty: </label>
        <input
        type = "text"
        value = {difficulty}
        onChange = {(e) => setDifficulty (e.target.value)}
        />

        <label>Description: </label>
        <textarea
        value = {description}
        onChange = {(e) => setDescription(e.target.value)}
        />

         <label>Price: </label>
        <input
        type = "number"
        value = {price}
        onChange = {(e) => setPrice (e.target.value)}
        />

        <button>Update workout</button>

      </form>
    </div>
  );
};

export default EditWorkoutPage;


