import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getUser,
  updateUser,
  clearState,
} from "../../../features/user/userSlice";
import FormInput from "../../../components/form-input/form-input";
import Textarea from "../../../components/textarea-input/textarea";
import Spinner from "../../../components/spinner/spinner";
import Button from "../../../components/button/button";
import UserProfileHeader from "../../../components/profile-header/profile-header";
import Modal from "../../modal/modal";

import "./user-profile-form.css";

const UserProfileForm = () => {
  const dispatch = useDispatch();

  const { loggedInUser, status, message } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: loggedInUser.username || "",
    email: loggedInUser.email || "",
    firstName: loggedInUser.profile ? loggedInUser.profile.firstName : "",
    lastName: loggedInUser.profile ? loggedInUser.profile.lastName : "",
    bio: loggedInUser.profile ? loggedInUser.profile.bio : "",
    image: null,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const { username, email, firstName, lastName, bio, image } = formData;

  useEffect(() => {
    if (status === "succeeded" && message !== "") {
      toast.success(message, { autoClose: 3000 });
    }
    return () => {
      dispatch(clearState());
    };
  }, [loggedInUser, status, message, dispatch]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onProfilePicChangeHandler = (event) => {
    const { files } = event.target;
    setFormData((prevState) => ({ ...prevState, image: files[0] }));
  };

  const clearImageState = () => {
    setFormData((prevState) => ({ ...prevState, image: null }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const profileData = new FormData();
    profileData.append("username", username);
    profileData.append("email", email);
    profileData.append("profile[firstName]", firstName);
    profileData.append("profile[lastName]", lastName);
    profileData.append("profile[bio]", bio);
    profileData.append("image", image);

    const data = {
      userId: loggedInUser._id,
      updatedData: profileData,
    };
    dispatch(updateUser(data));
    clearImageState();
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div className="form-box" style={{ width: "70%" }}>
      <UserProfileHeader description="Account Info" />
      <section className="profile-form">
        <form
          onSubmit={onSubmitHandler}
          encType="multipart/form-data"
          noValidate
        >
          <FormInput
            label="Username"
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            autoFocus
            value={username}
            onChange={onChangeHandler}
            required
          />
          <FormInput
            label="Email"
            id="email"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={onChangeHandler}
            required
          />
          <FormInput
            label="First Name"
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={onChangeHandler}
          />
          <FormInput
            label="Last Name"
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={onChangeHandler}
          />
          <Textarea
            label="Bio"
            id="bio"
            name="bio"
            placeholder="Add a bio..."
            value={bio}
            onChange={onChangeHandler}
          />
          <FormInput
            label="Profile Picture"
            id="image"
            type="file"
            name="image"
            accept=".jpg, .jpeg, .png "
            onChange={onProfilePicChangeHandler}
            className="image"
          />
          <div className="btn">
            <Button buttonType="success">Update Profile</Button>
            <Button
              buttonType="danger"
              type="button"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Delete Profile
            </Button>
            {modalOpen && <Modal closeModal={setModalOpen} />}
          </div>
        </form>
      </section>
    </div>
  );
};

export default UserProfileForm;
