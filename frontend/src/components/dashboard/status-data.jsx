import { MdOutlinePending } from "react-icons/md";
import {BsCalendar2Check} from 'react-icons/bs'
import {ImCross} from 'react-icons/im'
import { useSelector } from "react-redux";

import "./status-data.css";

const StatusData = () => {
  const { statusData } = useSelector((state) => state.job);
  return (
    <div className="status-data-container">
      <div className="status-data pending">
        <div className="status">
          <div className='status-heading'>Pending Job Applications</div>
          <div>{statusData["pending"]}</div>
        </div>
        <div className="status-icon">
          <MdOutlinePending />
        </div>
      </div>
      <div className="status-data interviewing">
        <div className="status">
          <div className='status-heading'>Interviews Scheduled</div>
          <div>{statusData["interviewing"]}</div>
        </div>
        <div className="status-icon">
          <BsCalendar2Check />
        </div>
      </div>
      <div className="status-data declined">
        <div className="status">
          <div className='status-heading'>Jobs Declined/No Reply</div>
          <div>{statusData["declined"]}</div>
        </div>
        <div className="status-icon">
          <ImCross />
        </div>
      </div>
    </div>
  );
};

export default StatusData;
