import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "Get all subscriptions" });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "Get subscription by ID" });
});

subscriptionRouter.post("/", (req, res) => {
  res.send({ title: "Create a new subscription" });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "Update subscription by ID" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete subscription by ID" });
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "Get subscriptions for a specific user" });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "Cancel subscription by ID" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "Get upcoming renewals" });
});
export default subscriptionRouter;
