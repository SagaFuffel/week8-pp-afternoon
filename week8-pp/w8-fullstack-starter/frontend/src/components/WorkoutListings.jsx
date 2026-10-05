import WorkoutListing from "./WorkoutListing";

const WorkoutListings = ({workouts}) => {
  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <WorkoutListing workout={workout} key={workout._id}/>
      ))}
    </div>
  );
};

export default WorkoutListings;
