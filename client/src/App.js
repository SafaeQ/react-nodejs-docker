import { useContext, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import OwnerSignUp from "./pages/signup/OwnerSignUp";
import CustomerSignUp from "./pages/signup/CustomerSignUp";
import OwnerLogin from "./pages/login/OwnerLogin";
import CustomerLogin from "./pages/login/CustomerLogin";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import CustomerProfilePage from "./pages/profile/CustomerProfile";
import OwnerProfilePage from "./pages/profile/OwnerProfile";
import AdminLogin from "./pages/admin/Login";
import AdminProfilePage from "./pages/admin/Profile";
import Dashboard from "./pages/admin/Dashboard";
import Room from "./pages/Room";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") ?? "false"
  );
  const changeState = (state) => {
    localStorage.setItem("isAuth", state);
    setIsAuth(state);
  };
  
  return (
    <>
      <MainHeader isAuth={isAuth} onLogout={changeState} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/Sign-up/*" element={<SignUp />} />
          <Route path="/sign-up/sign-up-as-owner" element={<OwnerSignUp />} />
          <Route
            path="/sign-up/sign-up-as-customer"
            element={<CustomerSignUp />}
          />
          <Route path="/login/*" element={<Login />} />
          <Route
            path="/login/login-as-owner"
            element={<OwnerLogin onLogin={changeState} />}
          />
          <Route
            path="/login/login-as-customer"
            element={<CustomerLogin onLogin={changeState} />}
          />
          <Route
            path="/admin"
            element={
              <AdminLogin
                onLogin={changeState}
                element={<Navigate to="/admin/login" />}
              />
            }
          />
          <Route
            path="/admin/login"
            element={<AdminLogin onLogin={changeState} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/login/reset-password" element={<ForgetPassword />} />
          <Route
            path="/customer/reset-password/:userId/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/owner/reset-password/:userId/:token"
            element={<ResetPassword />}
          />
          <Route path="/profile/*" element={<ProfilePage />} />
          <Route path="/profile/customer" element={<CustomerProfilePage />} />
          <Route path="/profile/owner" element={<OwnerProfilePage />} />
          <Route path="/profile/admin" element={<AdminProfilePage />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/room" element={<Room />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
