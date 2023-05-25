import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login, clearState } from "../../../features/auth/authSlice";
import { getUser } from "../../../features/user/userSlice";
import FormInput from "../../../components/form-input/form-input";
import Spinner from "../../../components/spinner/spinner";
import Button from "../../../components/button/button";

import "./login-form.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const { usernameOrEmail, password } = formData;

  const { userId, status, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "succeeded" && userId) {
      toast.success(message, { autoClose: 3000 });
      dispatch(getUser(userId));
      navigate("/dashboard");
    }
    dispatch(clearState());
  }, [status, message, navigate, dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const userData = { usernameOrEmail, password };
    dispatch(login(userData));
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div className="form-box">
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
          autoFocus
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
        <Button buttonType="primary">Login</Button>
        <Link to="/identify">Forgot Password?</Link>
        <hr />
        <p>
          Don't have an account yet? <Link to="/auth/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
