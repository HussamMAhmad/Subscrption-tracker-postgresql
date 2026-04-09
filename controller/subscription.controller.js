import { prisma } from "../lib/prisma.js";
import { SubValidator } from "../validators/subscription.validator.js";
import client from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

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

    const createSubscription = await prisma.subscription.create({
      data: {
        ...validateDate,
        renewalDate: renewalDate,
        userId: req.user.id,
      },
    });
    console.log("createSubscription", createSubscription.id);
    const { workflowRunId } = await client.trigger({
      url: `${SERVER_URL}/api/workflows/subscription/reminder`,
      body: {
        subscriptionId: createSubscription.id,
      },
      retries: 5,
    });
    // auto update the status if renwal date has passed
    if (renewalDate < new Date()) {
      const updateSubscription = await prisma.subscription.update({
        where: { id: createSubscription.id },
        data: { status: "EXPIRED" },
      });
      return res.status(201).json({ success: true, data: updateSubscription });
    }

    res.status(201).json({ success: true, data: {createSubscription , workflowRunId}});
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
        userId: req.params.id,
      },
    });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
