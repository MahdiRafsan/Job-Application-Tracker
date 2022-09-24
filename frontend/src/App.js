import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Register from "./routes/auth/register/register";
import Login from "./routes/auth/login/login";
import ResetPassword from "./routes/user/reset-password/reset-password";

import "./App.css";

function App() {
  return (
    <main className="App">
      {/* <Counter/> */}
      <Routes>
        <Route path="auth">
          <Route index path="register" element={<Register />} />
          <Route index path="login" element={<Login />} />
        </Route>
        <Route path="password">
          <Route index element={<ResetPassword />} />
          <Route index path=':id' element={<>Reset with token </>} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <ToastContainer autoClose={15000}/>
    </main>
  );
}

export default App;
