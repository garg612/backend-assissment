import mongoose from "mongoose";

const intakeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String
    },

    serviceType: {
      type: String
    },
    budget:{
        type: String
    },
    projectDescription:{
        type: String
    }
  },
  {
    timestamps: true
  }
);

const Intake = mongoose.model("Intake", intakeSchema);
export default Intake;