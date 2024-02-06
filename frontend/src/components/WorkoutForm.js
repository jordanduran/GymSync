import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useWorkoutsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }

    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      console.log('New workout added', data);
      dispatch({ type: 'CREATE_WORKOUT', payload: data });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col sm:space-y-4 lg:flex-row lg:space-x-8 lg:justify-center lg:mb-10'
    >
      <label className='font-bold'>Title:</label>
      <input
        type='text'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={
          emptyFields?.includes('title')
            ? 'border border-red-600'
            : 'border border-black mx-2'
        }
      />
      <label className='font-bold'>Load (in kg):</label>
      <input
        type='number'
        name='load'
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={
          emptyFields?.includes('load')
            ? 'border border-red-600'
            : 'border border-black mx-2'
        }
      />
      <label className='font-bold'>Reps:</label>
      <input
        type='number'
        name='reps'
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={
          emptyFields?.includes('reps')
            ? 'border border-red-600'
            : 'border border-black mx-2'
        }
      />
      <button className='px-2 py-1 bg-blue-600 text-white font-semibold mx-2 rounded-md hover:bg-blue-700'>
        Add new workout
      </button>
      {error && (
        <div
          className='border border-red-300 bg-red-100 text-red-500 p-4 rounded-md
        mt-5 font-semibold'
        >
          {error}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
