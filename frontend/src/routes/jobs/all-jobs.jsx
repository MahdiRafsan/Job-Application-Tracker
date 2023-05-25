import SearchForm from "../../components/search-form/search-form";
import AllJobsComponent from "../../components/jobs/all-jobs";
import Pagination from "../../components/pagination/pagination";

const AllJobsPage = () => {
  return (
    <div className="job-page-container">
      <div className='search-pagination'>
        <SearchForm />
        <Pagination />
      </div>
      <AllJobsComponent />
      <div className="bottom-pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default AllJobsPage;
