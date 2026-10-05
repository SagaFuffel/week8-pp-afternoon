import { Link } from "react-router-dom";

const WorkoutListing = ({ workout }) => {
  return (
    <div>
      <Link to={`/workouts/${workout._id}`}>
        <h2>{workout.title}</h2>
      </Link>
      <p>Difficulty: {workout.difficulty}</p>
      <p>Description: {workout.description}</p>
      <p>Price: {workout.price}</p>
    </div>
  );
};

export default WorkoutListing;