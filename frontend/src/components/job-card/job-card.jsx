import moment from "moment";
import { BsCalendarDay } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { FiBriefcase, FiEdit3 } from "react-icons/fi";
import { BsInfoSquare } from "react-icons/bs";
import { RiQuestionAnswerLine, RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../button/button";
import { deleteJob } from "../../features/jobs/jobSlice";

import "./job-card.css";
const JobCard = ({ job }) => {
  const {
    jobTitle,
    companyName,
    jobType,
    applicationStatus,
    jobLocation,
    applicationDate,
    interviewDate,
  } = job;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEditHandler = () => {
    navigate(`/job/${job._id}`);
  };

  const onDeleteHandler = () => {
    dispatch(deleteJob(job._id));
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <h1 className="card-title">{jobTitle}</h1>
        <h2 className="card-subtitle">{companyName}</h2>
      </div>
      <div className="card-body">
        <div
          className={
            applicationStatus === "pending"
              ? "card-body-content status pending"
              : applicationStatus === "interviewing"
              ? "card-body-content status interviewing"
              : "card-body-content status declined"
          }
        >
          <span className="card-body-icons">
            <BsInfoSquare />
          </span>
          <span className="card-body-text">{applicationStatus}</span>
        </div>
        <div className="card-body-content">
          <span className="card-body-icons">
            <FiBriefcase />
          </span>
          <span className="card-body-text">{jobType}</span>
        </div>

        {jobLocation && (
          <div className="card-body-content">
            <span className="card-body-icons">
              <FaLocationArrow />
            </span>
            <span className="card-body-text">{jobLocation}</span>
          </div>
        )}
        <div className="card-body-content">
          <span className="card-body-icons">
            <BsCalendarDay />
          </span>
          <span className="card-body-text">
            <b>Applied:</b> {moment(applicationDate).utcOffset(0).format("ddd, MMM Do YYYY")}
          </span>
        </div>
        {applicationStatus === "interviewing" && interviewDate && (
          <div className="card-body-content">
            <span className="card-body-icons">
              <RiQuestionAnswerLine />
            </span>
            <span className="card-body-text">
              <b>Interview:</b>{" "}
              {moment(interviewDate).format("ddd, MMM Do YYYY, hh:mm A")}
            </span>
          </div>
        )}
      </div>
      <div className="card-footer">
        <Button type="button" buttonType="info" onClick={onEditHandler}>
          <span className="icons">
            <FiEdit3 />
          </span>
          Edit
        </Button>
        <Button type="button" buttonType="danger" onClick={onDeleteHandler}>
          <span className="icons">
            <RiDeleteBin6Line />
          </span>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
