import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import passwordAPI from "../../../features/user/userPasswordAPI";
import UserProfileHeader from "../../profile-header/profile-header";
import FormInput from "../../form-input/form-input";
import Button from "../../button/button"; 

const { updatePassword } = passwordAPI;

const UpdatePasswordForm = () => {
  const { loggedInUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { currentPassword, newPassword, confirmPassword } = formData;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        currentPassword,
        newPassword,
        confirmPassword,
      };
      const response = await updatePassword(loggedInUser._id, data);
      toast.success(response.message);
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.details &&
        err.response.data.details.password
      ) {
        toast.error(err.response.data.details.password);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.details
      ) {
        toast.error(err.response.data.details);
      } else {
        toast.error(err.message);
      }
    }
  };
  return (
    <div className="form-box">
      <UserProfileHeader description="Update Password" />
      <form onSubmit={onSubmitHandler} noValidate>
        <FormInput
          label="Current Password"
          id="currentPassword"
          type="password"
          name="currentPassword"
          placeholder="Enter current password"
          autoFocus
          value={currentPassword}
          onChange={onChangeHandler}
          required
        />
        <FormInput
          label="New Password"
          id="newPassword"
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={newPassword}
          onChange={onChangeHandler}
          required
        />
        <FormInput
          label="Confirm New Password"
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={onChangeHandler}
          required
        />
        <Button buttonType='success'>Update Password</Button>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
