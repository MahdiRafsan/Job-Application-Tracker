import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoutes from "./routes/private-route";
import LandingPage from "./routes/landing";
import Sidebar from "./components/sidebar/sidebar";
import RegisterPage from "./routes/auth/register";
import LoginPage from "./routes/auth/login";
import ForgotPasswordPage from "./routes/profile/forgot-password";
import ResetPasswordPage from "./routes/profile/reset-password";
import HomePage from "./routes/home";
import AllJobsPage from "./routes/jobs/all-jobs";
import AddJobPage from "./routes/jobs/add-job";
import EditJobPage from "./routes/jobs/edit-job";
import UserProfilePage from "./routes/profile/user-profile";
import UpdatePasswordPage from "./routes/profile/update-password";
import NotFoundPage from "./routes/not-found";

import "./App.css";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="auth">
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route element={<Sidebar />}>
            <Route path="dashboard" element={<HomePage />} />
            <Route path="jobs" element={<AllJobsPage />} />
            <Route path="job">
              <Route index element={<AddJobPage />} />
              <Route path=":jobId" element={<EditJobPage />} />
            </Route>
            <Route path="account" element={<UserProfilePage />} />
            <Route path="password" element={<UpdatePasswordPage />} />
          </Route>
        </Route>
        <Route path="identify">
          <Route index element={<ForgotPasswordPage />} />
          <Route path="password/:token" element={<ResetPasswordPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer autoClose={15000} />
    </main>
  );
}

export default App;
