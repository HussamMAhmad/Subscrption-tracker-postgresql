import { Router } from "express";
import workflowServer from "../controller/workflow.controller.js";

const workflowRouter = Router();

workflowRouter.post("/subscription/reminder", workflowServer);

export default workflowRouter;
