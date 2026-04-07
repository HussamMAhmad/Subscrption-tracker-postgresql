import { success } from "zod";
import { prisma } from "../lib/prisma.js";
import { SubValidator } from "../validators/subscription.validator.js";

const newSubscription = async (req, res, next) => {
  try {
    const validateDate = SubValidator.parse(req.body);
    const frequency = validateDate.frequency;
    const renewlPeriods = {
      DAILY: 1,
      WEEKLY: 7,
      MONTHLY: 30,
      YEARLY: 365,
    };

    const startDate = validateDate.startDate;
    const renewalDate = new Date(startDate);
    renewalDate.setDate(renewalDate.getDate() + renewlPeriods[frequency]);

    const subscription = await prisma.subscription.create({
      data: {
        ...validateDate,
        renewalDate: renewalDate,
        userId: req.user.id,
      },
    });

    // auto update the status if renwal date has passed
    if (renewalDate < new Date()) {
      const updateSubscription = await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: "EXPIRED" },
      });
      return res.status(201).json({ success: true, data: updateSubscription });
    }

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export default newSubscription;

export const getAllSubscriptions = async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    console.log("req.user.id", req.user.id);  
    if (req.user.id != req.params.id) {
      const error = new Error("you are not the owner of this account"); 
      error.status = 401;
      throw error; 
    }

    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId : req.params.id,
      }
    }); 
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
