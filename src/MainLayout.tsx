import { Outlet } from 'react-router';
import Navbar from './components/Navbar/Navbar.tsx';
import NavigationBar from './components/NavigationBar/NavigationBar';

export default function MainLayout(props: {}) {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Navbar />
      <div className='grid grid-cols-3 grid-rows-1'>
        <NavigationBar />
        <Outlet />
      </div>
    </div>
  );
}
