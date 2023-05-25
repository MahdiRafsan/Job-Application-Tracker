import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "../../features/jobs/jobSlice";

import './interview-table.css'

const InterviewsTable = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { upcomingInterviews } = useSelector((state) => state.job);

  // IMPLEMENT LATER
  // Navigate to edit job page
  // const onClickHandler = (id) => {
  //   dispatch(getJob(id)).then(navigate(`/job/${id}`));
  // };

  return (
    <div className="interview-table">
      <h3>Next 5 Interviews</h3>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>Job Type</th>
            <th>Interview Date</th>
          </tr>
        </thead>
        <tbody>
          {upcomingInterviews.map((job) => {
            return (
              <tr key={job._id}>
                <td>{job.companyName}</td>
                <td>{job.jobTitle}</td>
                <td>{job.jobType}</td>
                <td>
                  <b>
                    {moment(job.interviewDate).format(
                      "ddd, MMM Do YYYY, hh:mm A"
                    )}
                  </b>
                </td>
                {/* <td onClick={() => onClickHandler(job._id)}>Edit</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewsTable;
