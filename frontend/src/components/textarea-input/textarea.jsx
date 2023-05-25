import "./textarea.css";

const Textarea = ({ label, ...otherProps }) => {
  return (
    <div className={`${otherProps.className} textarea-container`}>
      <div className="form-group">
        <label htmlFor={otherProps.id} className="form-label">
          {label}
        </label>
        <textarea {...otherProps} className="form-input" />
      </div>
    </div>
  );
};

export default Textarea;
