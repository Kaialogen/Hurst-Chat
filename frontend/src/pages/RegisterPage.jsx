import Navbar from "../components/Navbar/Navbar";
import LogoBanner from "../components/LogoBanner/LogoBanner";
import RegisterForm from "../components/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="bg-[#f5f5ff] text-center">
      <Navbar />
      <LogoBanner />
      <RegisterForm />
    </div>
  );
}
