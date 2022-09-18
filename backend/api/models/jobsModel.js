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
  values: ["hourly", "monthly", "annually"],
  message: "{VALUE} is not supported",
};
const APPLICATION_STATUS = {
  values: ["pending", "interviewing", "declined"],
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
      required: [true, "Company name can't be empty!"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job title can't be empty"],
    },
    jobType: {
      type: String,
      enum: JOB_TYPES,
      required: [true, "Job type can't be empty"],
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
    baseSalary: {
      currency: {
        type: String,
        default: "USD",
        set: (value) => (value === "" ? undefined : value),
      },
      value: {
        amount: {
          type: String,
          validate: {
            validator: (value) => validator.isNumeric(value),
            message: (props) => `Value must be a number! Got ${props.value}.`,
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
    applicationReply: {
      type: Boolean,
      default: false,
    },
    applicationStatus: {
      type: String,
      enum: APPLICATION_STATUS,
      lowercase: true,
      default: "pending",
    },
    interviewDate: {
      type: Date,
      set: (value) => (value === "" ? undefined : value),
    },
    offerReceived: {
      type: Boolean,
      default: false,
    },
    offerDate: {
      type: Date,
      set: (value) => (value === "" ? undefined : value),
    },
    offerReply: {
      type: Boolean,
      default: false,
    },
    offerAccepted: {
      type: Boolean,
      default: false,
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

// salarySpecified: {
//   type: Boolean,
//   default: No,
// },
// baseSalary: {
//   default: function() {
//     if (this.salarySpecified) {
//       return {
//         currency: {
//           type: String,
//         },
//         value: {
//           amount: {
//             type: Number,
//           },
//           frequency: {
//             type: String,
//           },
//           default: "Not Specified",
//         }
//       }
//     }
//   else {
//     return null
//   }
// }},
