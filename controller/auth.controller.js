import { User } from "../validators/user.validator.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXP } from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
    const validateData = User.parse(req.body);
    const { name, email, password } = validateData;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const result = await prisma.$transaction(
      async (tx) => {
        // check if a user already exists
        const existingUser = await tx.user.findUnique({
          where: { email: email },
        });

        if (existingUser) {
          const error = new Error("User already exists");
          error.statusCode = 409;
          throw error;
        }

        const newUser = await tx.user.create({
          data: {
            email,
            name,
            password: hashpassword,
          },
        });

        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
          expiresIn: JWT_EXP,
        });

        return { newUser, token };
      },
      {
        maxWait: 5000, // default is 2000ms
        timeout: 10000,
      },
    );

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: {
        token: result.token,
        user: result.newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const validateData = User.pick({ email: true, password: true }).parse(req.body);
    const { email, password } = validateData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 404;
      return next(error);
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXP,
    });

    res.status(200).json({
      success: true,
      message: "Sign in successful",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  // develope for sign out functionality if you are using cookies to store the token, you can clear the cookie here
}
