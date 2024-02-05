const WorkoutDetails = ({ workout }) => {
  return (
    <div className='border p-2 border-black my-5'>
      <h1 className='font-bold text-2xl text-blue-700'>{workout.title}</h1>
      <p>
        <strong>Load (Kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
