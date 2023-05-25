import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import passwordAPI from "../../../features/user/userPasswordAPI";
import FormInput from "../../../components/form-input/form-input";
import Button from "../../../components/button/button";
import "./forgot-reset-password.css";

const { forgotPassword } = passwordAPI;

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  const onChangeHandler = (event) => {
    setUsernameOrEmail(event.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ usernameOrEmail });
      toast.success(response.message);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.details) {
        toast.error(err.response.data.details);
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="form-box">
      <section className="forgot-password heading">
        <h1>Find Your Account</h1>
        <hr />
      </section>
      <form onSubmit={onSubmitHandler} noValidate>
        <FormInput
          label="Please enter your username or email to search for your account"
          id="usernameOrEmail"
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          autoFocus
          value={usernameOrEmail}
          onChange={onChangeHandler}
          required
        />
        <hr />
        <div className="forgot-password-btn">
          <Button
            type="button"
            buttonType="secondary"
            onClick={() => navigate("/auth/login")}
          >
            Cancel
          </Button>
          <Button buttonType="primary">Search</Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
