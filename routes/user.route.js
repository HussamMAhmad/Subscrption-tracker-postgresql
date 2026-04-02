import { Router } from "express";
import { getUser, getUsers } from "../controller/user.controller.js";
import authenticateToken from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authenticateToken , getUser);

userRouter.post("/", (req, res) => {
  res.send({ title: "Create new user" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "Update user" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete user" });
});

export default userRouter;
