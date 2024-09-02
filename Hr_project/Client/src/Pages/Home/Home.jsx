import Landing from "@/components/my_component/landing_page/landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../Sign/SignIn";
import SignUp from "../Sign/Signup";
import VerifyEmail from "../Sign/Verifyemail";
import UserProfile from "@/components/UserProfile";
import Forgetpassword from "../Sign/Forgetpassword";
import ResetPassword from "../Sign/ResetPassword";
import Candidate from "../Candidate/Candidate";
import Hr from "../Recruiter/Hr";

function Home() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<Forgetpassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/Profile" element={<UserProfile />} />
          <Route path="/Candidate" element={<Candidate />} />
          <Route path="/Hr" element={<Hr />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Home;
