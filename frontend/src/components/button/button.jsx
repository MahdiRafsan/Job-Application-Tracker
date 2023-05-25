import "./button.css";

const BUTTON_TYPE = {
  success: "success",
  danger: "danger",
  info: "info",
  primary: "primary",
  secondary: "secondary",
};

const Button = ({ buttonType, children, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE[buttonType]}`}
      {...otherProps} // otherProps include onClick function
    >
      {children}
    </button>
  );
};

export default Button;
