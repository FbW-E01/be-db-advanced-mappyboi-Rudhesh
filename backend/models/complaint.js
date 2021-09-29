import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  position: String,
  report: String,
});

const Complaint = mongoose.model("complaint", userSchema);

export default Complaint;
