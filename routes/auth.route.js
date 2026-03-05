import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup",(req, res) => {
    res.send({title: "Signup route"});
}); 
authRouter.post("/signin",(req, res) => {
    res.send({title: "Signin route"});
}); 
authRouter.post("/signout",(req, res) => {
    res.send({title: "Signout route"});
}); 

export default authRouter;