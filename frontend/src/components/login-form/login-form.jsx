import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login, clearState } from "../../features/auth/authSlice";
import FormInput from "../form-input/form-input";

import "./login-form.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const { usernameOrEmail, password } = formData;

  const { status, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "failed") {
      if (typeof message === "object") {
        for (let [_key, value] of Object.entries(message)) {
          toast.error(value);
        }
      }
      toast.error(message);
    }

    if (status === "succeeded") {
      toast.success(message);
    }

    dispatch(clearState())
  }, [status, message, dispatch]);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const userInfo = { usernameOrEmail, password };
    dispatch(login(userInfo));
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="box">
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <form onSubmit={onSubmitHandler} noValidate>
        <FormInput
          label="Username/Email"
          id="usernameOrEmail"
          type="text"
          name="usernameOrEmail"
          placeholder="Email or Username"
          value={usernameOrEmail}
          onChange={onChangeHandler}
          required
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={onChangeHandler}
          required
        />
        <button>Login</button>
        <hr />
        <Link to="/password">Forgot Password?</Link>
        <p>
          Don't have an account yet?
          <Link to="/auth/register">
            <button>Register</button>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
