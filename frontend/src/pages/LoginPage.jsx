import Navbar from "../components/Navbar/Navbar";
import LogoBanner from "../components/LogoBanner/LogoBanner";
import LoginForm from "../components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-[#f5f5ff] text-center">
      <Navbar />
      <LogoBanner />
      <LoginForm />
    </div>
  );
}
