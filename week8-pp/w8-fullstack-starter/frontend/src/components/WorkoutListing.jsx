
import { Link } from "react-router-dom";

const WorkoutListing = ({ workout }) => {
  return (
    <div className="workout-preview">
      <Link to={`/workouts/${workout._id}`}>
        <h2>{workout.title}</h2>
      </Link>
      <p>{workout.title}</p>
      <p>{workout.difficulty}</p>
      <p>{workout.description}</p>
      <p>{workout.price}</p>
    </div>
  );
};

export default WorkoutListing;


