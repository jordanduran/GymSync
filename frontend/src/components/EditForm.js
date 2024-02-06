import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const EditForm = ({ workout }) => {
  const { _id, title, load, reps } = workout;

  const [newTitle, setNewTitle] = useState(title);
  const [newLoad, setNewLoad] = useState(load);
  const [newReps, setNewReps] = useState(reps);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const navigate = useNavigate();
  const { dispatch } = useWorkoutsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedWorkout = { newTitle, newLoad, newReps };

    const response = await fetch(`/api/workouts/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
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
      const updatedWorkout = {
        load: newLoad,
        reps: newReps,
        title: newTitle,
        ...data,
      };

      setNewTitle('');
      setNewLoad('');
      setNewReps('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'UPDATE_WORKOUT', payload: updatedWorkout });
      console.log('Workout updated', data);
      navigate('/');
    }
  };

  return (
    <>
      <h2 className='font-bold text-2xl mb-8'>Edit Workout</h2>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <label className='font-bold'>Title:</label>
        <input
          type='text'
          name='newTitle'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={
            emptyFields?.includes('title') && newTitle === ''
              ? 'border border-red-600'
              : 'border border-black mx-2'
          }
        />
        <label className='font-bold'>Load (in kg):</label>
        <input
          type='number'
          name='load'
          value={newLoad}
          onChange={(e) => setNewLoad(e.target.value)}
          className={
            emptyFields?.includes('load') && newLoad === ''
              ? 'border border-red-600'
              : 'border border-black mx-2'
          }
        />
        <label className='font-bold'>Reps:</label>
        <input
          type='number'
          name='reps'
          value={newReps}
          onChange={(e) => setNewReps(e.target.value)}
          className={
            emptyFields?.includes('reps') && newReps === ''
              ? 'border border-red-600'
              : 'border border-black mx-2'
          }
        />
        <div>
          <button className='px-2 py-1 bg-blue-600 text-white font-semibold mx-2 rounded-md hover:bg-blue-700 mt-4'>
            Update workout
          </button>
        </div>
        {error && (
          <div
            className='border border-red-300 bg-red-100 text-red-500 p-4 rounded-md
        mt-5 font-semibold'
          >
            {error}
          </div>
        )}
      </form>
    </>
  );
};

export default EditForm;
