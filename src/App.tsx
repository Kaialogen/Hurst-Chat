import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./MainLayout.tsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TermsPage from "./pages/TermsPage";
import CreateCategory from "./pages/CreateCategory";
import CategoriesPage from "./pages/CategoriesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/createCategory" element={<CreateCategory />} />
          <Route path="/Categories/:categoryName" element={<CategoriesPage />} />
      </Route>
      </Routes>
    </BrowserRouter>
  )
}