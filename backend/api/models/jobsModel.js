const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const JOB_TYPES = {
  values: [
    "full-time",
    "part-time",
    "internship",
    "contract",
    "temporary",
    "seasonal",
  ],
  message: "{VALUE} is not supported",
};
const SALARY_FREQUENCY = {
  values: ["", "hourly", "monthly", "annually"],
  message: "{VALUE} is not supported",
};
const APPLICATION_STATUS = {
  values: ["pending", "interviewing", "declined"],
  message: "{VALUE} is not supported",
};

const OFFER_DECISION = {
  values: ["", "accepted", "rejected", "still considering"],
  message: "{VALUE} is not supported",
};

const jobsSchema = Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is a required field to add jobs!"],
    },
    companyName: {
      type: String,
      required: [true, "Company Name can't be empty!"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job Title can't be empty"],
    },
    jobType: {
      type: String,
      enum: JOB_TYPES,
      required: [true, "Job Type can't be empty"],
      lowercase: true,
    },
    jobLocation: {
      type: String,
      set: (value) => (value === "" ? undefined : value),
    },
    jobDuration: {
      type: String,
      set: (value) => (value === "" ? undefined : value),
    },
    salarySpecified: {
      type: Boolean,
      default: false,
      set: (value) => (value === "" ? false : value),
    },
    baseSalary: {
      currency: {
        type: String,
        default: undefined,
        set: (value) => (value === "" ? undefined : value),
      },
      value: {
        amount: {
          type: String,
          set: (value) => (value === "" ? undefined : value),
          validate: {
            validator: (value) => validator.isNumeric(value),
            message: (props) =>
              `Salary amount must be a number! Got ${props.value}.`,
          },
        },
        frequency: {
          type: String,
          lowercase: true,
          enum: SALARY_FREQUENCY,
        },
      },
    },
    applicationDate: {
      type: Date,
      default: Date.now,
      set: (value) => (value === "" ? Date.now() : value),
    },
    associatedEmail: {
      type: String,
      lowercase: true,
      trim: true,
      set: (value) => (value === "" ? undefined : value),
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    applicationStatus: {
      type: String,
      enum: APPLICATION_STATUS,
      lowercase: true,
      default: "pending",
      set: (value) => (value === "" ? "pending" : value),
    },
    interviewDate: {
      type: Date,
      set: (value) => (value === "" ? undefined : value),
    },
    offerReceived: {
      type: Boolean,
      default: false,
      set: (value) => (value === "" ? false : value),
    },
    offerDate: {
      type: Date,
      set: (value) => (value === "" ? undefined : value),
    },
    offerReply: {
      type: Boolean,
      default: false,
      set: (value) => (value === "" ? false : value),
    },
    offerDecision: {
      type: String,
      enum: OFFER_DECISION,
      lowercase: true,
      default: "",
    },
    attachedResumeName: {
      type: String,
      set: (value) => (value === "" ? undefined : value),
    },
    attachedCoverLetterName: {
      type: String,
      set: (value) => (value === "" ? undefined : value),
    },
    linkedinConnection: {
      type: String,
      set: (value) => (value === "" ? undefined : value),
    },
    followup: {
      type: String,
      set: (value) => (value === "" ? undefined : value),
    },
    comments: {
      type: String,
      set: (value) => (value === "" ? undefined : value),
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "last_updated_at",
    },
  }
);

module.exports = mongoose.model("Job", jobsSchema);
