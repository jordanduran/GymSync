import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// components
import WorkoutForm from '../components/WorkoutForm';
import WorkoutDetails from '../components/WorkoutDetails';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: data });
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className='home'>
      <h1 className='font-bold text-4xl mb-8'>Workouts</h1>
      <WorkoutForm />
      {workouts &&
        workouts.map((workout) => {
          return <WorkoutDetails key={workout._id} workout={workout} />;
        })}
    </div>
  );
};

export default Home;
