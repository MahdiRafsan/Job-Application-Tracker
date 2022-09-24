import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register, clearState } from "../../features/auth/authSlice";
import FormInput from "../form-input/form-input";
import Spinner from "../spinner/spinner";
import "./register-form.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = formData;

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

    const userInfo = { username, email, password, confirmPassword };

    dispatch(register(userInfo));
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  if (status === "loading"){
    return <Spinner/>
  }
 
  return (
    <div className="box">
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
      </section>
      <form onSubmit={onSubmitHandler} noValidate>
        <FormInput
          label="Username"
          id="username"
          type="text"
          name="username"
          placeholder="John Doe"
          value={username}
          onChange={onChangeHandler}
          required
        />
        <FormInput
          label="Email"
          id="email"
          type="email"
          name="email"
          placeholder="email@email.com"
          value={email}
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
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onChangeHandler}
          required
        />

        <button>Register</button>
        <hr />
        <p>
          Already have an account?
          <Link to="/auth/login">
            <button>Go to Login</button>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
