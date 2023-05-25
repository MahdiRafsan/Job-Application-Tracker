import { useSelector } from "react-redux";

import defaultImage from "../../assets/default_image.jpg";

import "./profile-header.css";
const UserProfileHeader = ({ description }) => {
  const { loggedInUser } = useSelector((state) => state.user);
  const {
    username,
    email,
    profile: { bio, image: { url } = {} } = {},
  } = loggedInUser;
  return (
    <>
      <section className="user-profile-header">
        <div className="user-profile-image">
          <img src={url || defaultImage} alt="Profile" />
        </div>
        <div className="user-profile-info">
          <h1>{username}</h1>
          <small>{email}</small>
          <p>{bio}</p>
        </div>
      </section>
      <hr />
      <h2>{description}</h2>
    </>
  );
};

export default UserProfileHeader;
