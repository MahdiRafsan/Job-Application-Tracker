import "./spinner.css";

const Spinner = () => {
  return (
    <div className='spinner-outside-container'>
      <div className="spinner-overlay">
        <div className="spinner-container"></div>
      </div>
    </div>
  );
};

export default Spinner;
