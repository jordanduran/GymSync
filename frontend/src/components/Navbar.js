import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className='flex justify-between items-center bg-blue-800 px-8 py-3'>
        <Link to='/'>
          <h1 className='text-3xl font-bold text-white'>GymSync</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
