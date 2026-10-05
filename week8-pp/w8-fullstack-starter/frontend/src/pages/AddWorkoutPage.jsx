const AddWorkoutPage = () => {
  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="create">
      <h2>Add a New Workout</h2>
      <form onSubmit={submitForm}>
        <label>Title:</label>
        <input type="text" required />
        <label>Difficulty:</label>
        <select>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <label>Description:</label>
        <textarea required></textarea>
        <label>Price:</label>
        <input type="number" step="0.01" min="0" required />
        <button>Add Workout</button>
      </form>
    </div>
  );
};

export default AddWorkoutPage;
