import { prisma } from "../lib/prisma";
import { SubValidator } from "../validators/subscription.validator";

const newSubscription = async (req, res, next) => {
  try {
    const validateDate = SubValidator.parse(req.body);
    const frequency = SubValidator.frequency;
    const renewlPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    const startDate = validateDate.startDate;
    const renewal = new Date(startDate);
    const renewalDate = renewal.setDate(
      renewal.getDate() + renewlPeriods[frequency],
    );

    const subscription = await prisma.create({
      validateDate,
      renewalDate:renewalDate, 
      userId: req.user.id,
    });
  } catch (error) {
    next(error);
  }
};
