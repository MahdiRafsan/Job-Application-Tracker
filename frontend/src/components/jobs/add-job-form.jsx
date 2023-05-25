import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineForm } from "react-icons/ai";
import { toast } from "react-toastify";
import FormInput from "../../components/form-input/form-input";
import Dropdown from "../../components/dropdown-input/dropdown";
import Textarea from "../../components/textarea-input/textarea";
import Button from "../../components/button/button";

import { createJob, clearState } from "../../features/jobs/jobSlice";

import "./job-forms.css";

import {
  JOB_TYPE_OPTIONS,
  APPLICATION_STATUS_OPTIONS,
  SALARY_FREQUENCY_OPTIONS,
  OFFER_DECISION,
  BOOLEAN_OPTIONS,
} from "../../components/dropdown-input/dropdown-options";

const AddJobForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobType: "",
    jobLocation: "",
    jobDuration: "",
    salarySpecified: "",
    currency: "",
    amount: "",
    frequency: "",
    applicationDate: "",
    associatedEmail: "",
    applicationStatus: "",
    interviewDate: "",
    offerReceived: "",
    offerDate: "",
    offerReply: "",
    offerDecision: "",
    attachedResumeName: "",
    attachedCoverLetterName: "",
    followUp: "",
    linkedinConnection: "",
    comments: "",
  });

  const {
    jobTitle,
    companyName,
    jobType,
    jobLocation,
    jobDuration,
    salarySpecified,
    currency,
    amount,
    frequency,
    applicationDate,
    associatedEmail,
    applicationStatus,
    interviewDate,
    offerReceived,
    offerDate,
    offerReply,
    offerDecision,
    attachedResumeName,
    attachedCoverLetterName,
    followUp,
    linkedinConnection,
    comments,
  } = formData;

  const { status, message } = useSelector((state) => state.job);

  useEffect(() => {
    if (status === "succeeded" && message !== "") {
      toast.success(message, { autoClose: 3000 });
    }

    dispatch(clearState());
  }, [status, message, dispatch]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const jobData = {
      jobTitle,
      companyName,
      jobType,
      jobLocation,
      jobDuration,
      salarySpecified,
      baseSalary: {
        currency,
        value: {
          amount,
          frequency,
        },
      },
      applicationDate,
      associatedEmail,
      applicationStatus,
      interviewDate,
      offerReceived,
      offerDate,
      offerReply,
      offerDecision,
      attachedResumeName,
      attachedCoverLetterName,
      followUp,
      linkedinConnection,
      comments,
    };

    dispatch(createJob(jobData));
  };

  return (
    <div className="form-box" style={{ width: "97%" }}>
      <section className="heading">
        <h1>
          <AiOutlineForm /> Add a New Job
        </h1>
      </section>
      <form className="job-form" onSubmit={onSubmitHandler} noValidate>
        <FormInput
          label="Job Title"
          id="jobTitle"
          type="text"
          name="jobTitle"
          placeholder="Software Engineer"
          autoFocus
          value={jobTitle}
          onChange={onChangeHandler}
          required
        />
        <FormInput
          label="Company Name"
          id="companyName"
          type="text"
          name="companyName"
          placeholder="MC Corporation"
          value={companyName}
          onChange={onChangeHandler}
          required
        />
        <Dropdown
          label="Job Type"
          id="jobType"
          name="jobType"
          value={jobType}
          options={JOB_TYPE_OPTIONS}
          onChange={onChangeHandler}
          required
        />
        <FormInput
          label="Job Location"
          id="jobLocation"
          type="text"
          name="jobLocation"
          placeholder="Remote"
          value={jobLocation}
          onChange={onChangeHandler}
        />
        <FormInput
          label="Job Duration"
          id="jobDuration"
          type="text"
          name="jobDuration"
          placeholder="Fall 2022"
          value={jobDuration}
          onChange={onChangeHandler}
        />
        <Dropdown
          label="Salary Specified"
          id="salarySpecified"
          name="salarySpecified"
          options={BOOLEAN_OPTIONS}
          value={salarySpecified}
          onChange={onChangeHandler}
        />
        {salarySpecified === "true" && (
          <>
            <FormInput
              label="Currency"
              id="currency"
              type="text"
              name="currency"
              placeholder="USD"
              value={currency}
              onChange={onChangeHandler}
              className="fade-in"
            />
            <FormInput
              label="Amount"
              id="amount"
              type="text"
              name="amount"
              placeholder="50.00"
              value={amount}
              onChange={onChangeHandler}
              className="fade-in"
            />
            <Dropdown
              label="Frequency"
              id="frequency"
              name="frequency"
              options={SALARY_FREQUENCY_OPTIONS}
              value={frequency}
              onChange={onChangeHandler}
              className="fade-in"
            />
          </>
        )}

        <FormInput
          label="Application Date"
          id="applicationDate"
          type="date"
          name="applicationDate"
          value={applicationDate}
          onChange={onChangeHandler}
        />
        <FormInput
          label="Associated Email"
          id="associatedEmail"
          type="email"
          name="associatedEmail"
          placeholder="email@email.com"
          value={associatedEmail}
          onChange={onChangeHandler}
        />
        <Dropdown
          label="Application Status"
          id="applicationStatus"
          name="applicationStatus"
          options={APPLICATION_STATUS_OPTIONS}
          value={applicationStatus}
          onChange={onChangeHandler}
        />
        {applicationStatus === "interviewing" && (
          <FormInput
            label="Interview Date"
            id="interviewDate"
            type="datetime-local"
            name="interviewDate"
            value={interviewDate}
            onChange={onChangeHandler}
            className="fade-in"
          />
        )}

        <Dropdown
          label="Offer Received"
          id="offerReceived"
          name="offerReceived"
          options={BOOLEAN_OPTIONS}
          value={offerReceived}
          onChange={onChangeHandler}
        />
        {offerReceived === "true" && (
          <>
            <FormInput
              label="Offer Date"
              id="offerDate"
              type="date"
              name="offerDate"
              value={offerDate}
              onChange={onChangeHandler}
              className="fade-in"
            />
            <Dropdown
              label="Replied To Offer"
              id="offerReply"
              name="offerReply"
              options={BOOLEAN_OPTIONS}
              value={offerReply}
              onChange={onChangeHandler}
              className="fade-in"
            />
            {offerReply === "true" && (
              <Dropdown
                label="Decision"
                id="offerDecision"
                name="offerDecision"
                options={OFFER_DECISION}
                value={offerDecision}
                onChange={onChangeHandler}
                className="fade-in"
              />
            )}
          </>
        )}

        <FormInput
          label="Attached Resume Name"
          id="attachedResumeName"
          type="text"
          name="attachedResumeName"
          placeholder="John Doe Computer Science Resume"
          value={attachedResumeName}
          onChange={onChangeHandler}
        />
        <FormInput
          label="Attached Cover Letter Name"
          id="attachedCoverLetterName"
          type="text"
          name="attachedCoverLetterName"
          placeholder="John Doe Cover Letter"
          value={attachedCoverLetterName}
          onChange={onChangeHandler}
        />
        <FormInput
          label="Follow Up"
          id="followUp"
          type="text"
          name="followUp"
          placeholder="Followed up on..."
          value={followUp}
          onChange={onChangeHandler}
        />
        <FormInput
          label="LinkedIn Connection"
          id="linkedinConnection"
          type="text"
          name="linkedinConnection"
          placeholder="Connected with Jane Smith after application"
          value={linkedinConnection}
          onChange={onChangeHandler}
        />
        <Textarea
          label="Additional Comments"
          id="comments"
          name="comments"
          placeholder="Medium Interview"
          value={comments}
          onChange={onChangeHandler}
        />

        <div className="btn">
          <Button buttonType="success">Add Job</Button>
        </div>
      </form>
    </div>
  );
};

export default AddJobForm;
