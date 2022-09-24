import "./form-input.css";

const FormInput = (props) => {
  const { label, ...otherProps } = props;

  return (
    <div className="form-group">
      <label htmlFor={otherProps.id} className="form-label">
        {label}
      </label>
      <input
        {...otherProps}
        className="form-input"
        required={otherProps.required ? true : false}
      />
    </div>
  );
};

export default FormInput;
