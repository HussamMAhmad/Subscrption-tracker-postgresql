import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subsription.route.js";
import errorMidlleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(arcjetMiddleware); 

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/workflows", workflowRouter);

app.use(errorMidlleware);

app.get("/", (req, res) => {
  res.send("Welome to the subscription tracker by postgreysql");
});

app.listen(PORT, () => {
  console.log(
    `Subscription Tracker API is running on http://localhost:${PORT}`,
  );
});

export default app;
