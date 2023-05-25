import "./dropdown.css";

const Dropdown = ({ label, options, ...otherProps }) => {
  return (
    <div className={`${otherProps.className} dropdown-container`}>
      <div className="form-group">
        <label htmlFor={otherProps.id} className="dropdown-label">
          {label}
        </label>
        <select {...otherProps} className="dropdown-select">
          {options.map((option, index) => {
            return (
              <option
                key={index}
                value={option.value}
                className="dropdown-options"
              >
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
