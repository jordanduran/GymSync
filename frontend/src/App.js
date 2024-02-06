import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Edit from './pages/Edit';

// components
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='max-x-3xl mx-auto p-8'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/edit/:id' element={<Edit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
