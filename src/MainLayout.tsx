import { Outlet } from 'react-router';
import Navbar from './components/Navbar/Navbar.tsx';
import NavigationBar from './components/NavigationBar/NavigationBar';
import RightNavigationBar from './components/RightNavigationBar/RightNavigationBar.tsx';

export default function MainLayout(props: {}) {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Navbar />
      <div className='grid grid-cols-[1fr_3fr_1fr] grid-rows-1'>
        <NavigationBar />
        <Outlet />
        <RightNavigationBar />
      </div>
    </div>
  );
}
