import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import passwordAPI from "../../../features/user/userPasswordAPI";
import FormInput from "../../../components/form-input/form-input";
import Button from "../../../components/button/button";

import "./forgot-reset-password.css";

const { resetPassword } = passwordAPI;

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { newPassword, confirmPassword } = formData;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    console.log(token);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { newPassword, confirmPassword };
      const response = await resetPassword(token, data);
      toast.success(response.message);
      navigate("/auth/login");
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
      <section className="reset-password heading">
        <h1>Reset Password</h1>
        <hr />
      </section>
      <form onSubmit={onSubmitHandler} noValidate>
        <FormInput
          label="New Password"
          id="newPassword"
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={onChangeHandler}
          autoFocus
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
        <Button buttonType='success'>Reset</Button>
        <hr />
        <p>
          <Link to="/auth/login">Back to login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
