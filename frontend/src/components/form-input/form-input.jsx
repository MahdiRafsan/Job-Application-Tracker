import "./form-input.css";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className={`${otherProps.className} form-input-container`}>
      <div className="form-group">
        <label htmlFor={otherProps.id} className="form-label">
          {label}
        </label>
        <input {...otherProps} className="form-input" />
      </div>
    </div>
  );
};

export default FormInput;
