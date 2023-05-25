import { Link } from "react-router-dom";

import not_found from "../../assets/not-found.jpg";

import "./not-found.css";

const NotFoundComponent = () => {
  return (
    <div className="error-page-container">
      <img src={not_found} className="error-image" alt="error" />
      <h1 className="error-heading">
        <span>404 </span>| Page not found!
      </h1>
      <p className="error-text">
        The page you were looking for does not exist.
        <br />
        Click <Link to="/">here</Link> to return to the Home Page
      </p>
    </div>
  );
};

export default NotFoundComponent;
