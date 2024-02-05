import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className='flex justify-between items-center bg-blue-800 px-8 py-3'>
        <Link to='/'>
          <h1 className='text-3xl font-bold text-white'>GymSync</h1>
        </Link>
        <Link to='/create' className='bg-white p-2 font-bold'>
          Add New Workout
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
