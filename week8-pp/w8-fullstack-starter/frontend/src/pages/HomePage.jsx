
import {useState, useEffect} from "react";

import WorkoutListings from "../components/WorkoutListings";


const Home = () => {

  const [workouts, setWorkouts] = useState ([]);
  const [isPending, setIsPending] = useState (true);
  const [error, setError] = useState (null);

  useEffect (() => {
    const fetchWworkouts = async () => {
      try {
        const response = await fetch ("/api/workouts");

        if (!response.ok) {
          throw new Error ("Failed to fetch workouts");
        }
        const data = await response.json();

        setIsPending(false);
        setError(null);
        setWorkouts(data);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      };
    }
    fetchWworkouts();
  }, []);

  return (
    <div className="home">
      <div>
        {error && <div>{error}</div>}

        {isPending && <div>Loading...</div>}

        {workouts && <WorkoutListings workouts = {workouts}/>}

      </div>
    </div>
  );
};

export default Home;

