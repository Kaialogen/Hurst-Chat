import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './MainLayout.tsx';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import TermsPage from './pages/TermsPage.tsx';
import CreateCategory from './pages/CreateCategory.tsx';
import CategoriesPage from './pages/CategoriesPage.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route path='/createCategory' element={<CreateCategory />} />
          <Route path='/Categories/:categoryName' element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
