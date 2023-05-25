import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";

import {
  APPLICATION_STATUS_OPTIONS,
  JOB_TYPE_OPTIONS,
  SORT_OPTIONS,
} from "../dropdown-input/dropdown-options";

import { setFilters, clearFilters } from "../../features/jobs/jobSlice";

import FormInput from "../form-input/form-input";
import Dropdown from "../dropdown-input/dropdown";
import Button from "../button/button";

import "./search-form.css";

const SearchForm = () => {
  const dispatch = useDispatch();

  const { searchTerm, applicationStatus, jobType, sortBy } = useSelector(
    (state) => state.job
  );

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    dispatch(setFilters({ name, value }));
  };

  const buttonClickHandler = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="form-box search">
      <section>
        <h1>
          <AiOutlineSearch /> Search
        </h1>
      </section>
      <form className="search-form" noValidate>
        <FormInput
          label="Search Term"
          id="searchTerm"
          type="search"
          name="searchTerm"
          placeholder="Search ..."
          autoFocus
          value={searchTerm}
          onChange={onChangeHandler}
        />
        <Dropdown
          label="Application Status"
          id="applicationStatus"
          name="applicationStatus"
          value={applicationStatus}
          options={APPLICATION_STATUS_OPTIONS}
          onChange={onChangeHandler}
        />
        <Dropdown
          label="Job Type"
          id="jobType"
          name="jobType"
          value={jobType}
          options={JOB_TYPE_OPTIONS}
          onChange={onChangeHandler}
        />
        <Dropdown
          label="Sort By"
          id="sortBy"
          name="sortBy"
          value={sortBy}
          options={SORT_OPTIONS}
          onChange={onChangeHandler}
        />
        <div className="btn">
          <Button buttonType="info" type="button" onClick={buttonClickHandler}>
            Clear Filters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
