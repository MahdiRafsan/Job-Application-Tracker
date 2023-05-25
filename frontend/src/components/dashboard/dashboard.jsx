import { AiOutlineHome } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../features/jobs/jobSlice";

import InterviewsTable from "./interviews-table";
import HorizontalBarChart from "./horizontal-bar-chart";
import DoughnutChart from "./doughnut chart";
import BarChart from "./bar-chart";
import AreaChart from "./area-chart";

import "./dashboard.css";
import StatusData from "./status-data";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  // display upcoming interviews(company and time) for the next week/15 days/month
  // display stats (interviewing, declined, pending)

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="dashboard-left-header">
          <div className="dashboard-icon">
            <AiOutlineHome />
          </div>
          <div className="dashboard-text">Dashboard</div>
        </div>
        <div className="dashboard-right-header">
          <AiOutlineHome />
          /Dashboard
        </div>
      </div>

      {/* CONTENT */}
      <div className="dashboard-content">
        <div className="dashboard-graphs">
          <div className="chart">
            <HorizontalBarChart /> {/* Applications per Job Type */}
          </div>
          <div className="chart">
            <DoughnutChart /> {/* Recent Applications (Last 6 months) */}
          </div>
          <div className="chart">
            <BarChart /> {/* Monthly Applications */}
          </div>
          <div className="chart">
            <AreaChart /> {/* Yearly Applications */}
          </div>
        </div>
        <div className="dashboard-stats">
          <StatusData /> {/* Job Status Data */}
          <InterviewsTable /> {/* Upcoming Interviews */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
