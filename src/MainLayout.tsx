import { Outlet} from "react-router";
import Navbar from './components/Navbar/Navbar.jsx';

export default function MainLayout(props: {}) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  )
}