import { Link } from "react-router-dom";

const WorkoutListing = ({ workout }) => {
  return (
    <Link to={`/workouts/${workout._id}`}>
      <div className="workout-preview">
        <h2>{workout.title}</h2>
        <p>Difficulty: {workout.difficulty}</p>
        <p>{workout.description}</p>
        <p>Price: ${workout.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default WorkoutListing;