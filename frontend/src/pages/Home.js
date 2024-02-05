import { useState, useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className='home'>
      <h1 className='font-bold text-4xl mb-8'>Workouts</h1>
      {workouts &&
        workouts.map((workout) => {
          return <WorkoutDetails key={workout._id} workout={workout} />;
        })}
    </div>
  );
};

export default Home;
