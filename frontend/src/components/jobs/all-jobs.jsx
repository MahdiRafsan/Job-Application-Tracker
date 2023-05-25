import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import JobCard from "../../components/job-card/job-card";
import Spinner from "../../components/spinner/spinner";
import { getJobs, clearState } from "../../features/jobs/jobSlice";

import "./all-jobs.css";

const AllJobsComponent = () => {
  const dispatch = useDispatch();
  const { totalJobs, currentPage, totalPages, limit, jobs, status, message, searchTerm, applicationStatus, jobType, sortBy } =
    useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJobs());

    return () => {
      dispatch(clearState());
    };
  }, [currentPage, limit, searchTerm, applicationStatus, jobType, sortBy, dispatch]);

  if (status === "succeeded" && message !== "") {
    toast.success(message, { autoClose: 3000 });
  }

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      {totalJobs > 0 ? (
        <>
          <h2 className="heading">
            {totalJobs} Jobs Found |{" "}
            <small>
              Page {currentPage} / {totalPages}
            </small>
          </h2>
          <div className="jobs-container">
            {jobs.map((job) => {
              return <JobCard key={job._id} job={job} />;
            })}
          </div>
        </>
      ) : (
        <h2 className="heading">You have no jobs to display</h2>
      )}
    </>
  );
};

export default AllJobsComponent;
