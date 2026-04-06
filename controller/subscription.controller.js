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
      return res.status(201).json({success: true , data: updateSubscription});
    }

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export default newSubscription; 
