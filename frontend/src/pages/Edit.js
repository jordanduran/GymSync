import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditForm from '../components/EditForm';

const Edit = () => {
  const [workout, setWorkout] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`/api/workouts/${id}`);
      const data = await response.json();

      if (response.ok) {
        setWorkout(data);
      }
    };

    fetchWorkout();
  }, [id]);

  return <EditForm workoutId={id} workout={workout} />;
};

export default Edit;
