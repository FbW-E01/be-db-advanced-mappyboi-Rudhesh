import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import requestlogger from "./middleware/requestlogger.js";
import mongoose from "mongoose";
import Complaint from "./models/complaint.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestlogger);

const { DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;
const connectionString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/exampledb`;

console.log("pending report");

mongoose.connection.on("error", () => {
  console.log("err");
});
mongoose.connection.on("connecting", () => {
  console.log("connecting");
});
mongoose.connection.on("connected", () => {
  console.log("connected");
});
console.log("Saving");

app.get("/notifications", (req, res) => {
  // Somehow load data from DB
  console.log("hello");
  res.json([]);
});

app.post("/notifications", (req, res) => {
  console.log("Received", req.body);
  // Somehow save data to DB

  mongoose
    .connect(connectionString)
    .then(async () => {
      console.log("Saving report");
      const report = new Complaint(req.body);
      console.log(report);
      await report.save();

      console.log("Report saved!");
      res.status(201);
      res.json({ success: true });
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
      res.status(500);
      res.json({ success: false, error: "Connection error!" });
    })
    .finally(() => {
      mongoose.connection.close();
    });
});

app.listen(process.env.PORT, () => {
  console.info(`App listening on http://localhost:${process.env.PORT}`);
});
