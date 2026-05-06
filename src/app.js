import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import errorHandler from "./middlewares/error.middlewares.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(morgan("dev"));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP"
});
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Import routes
import intakeRoutes from "./routes/intake.routes.js";
// Use routes
app.use("/api/v1", intakeRoutes);



app.use(errorHandler);

export  {app};