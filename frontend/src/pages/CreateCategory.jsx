import Navbar from "../components/Navbar/Navbar";
import LogoBanner from "../components/LogoBanner/LogoBanner";
import CreateCategoryForm from "../components/CreateCategoryForm/CreateCategoryForm";

export default function CreateCategory() {
  return (
    <div className="bg-[#f5f5ff] text-center">
      <Navbar />
      <LogoBanner />
      <CreateCategoryForm />
    </div>
  );
}
