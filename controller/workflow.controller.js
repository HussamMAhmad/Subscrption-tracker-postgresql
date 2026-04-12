import { serve } from "@upstash/workflow/express";
import { prisma } from "../lib/prisma.js";
import dayjs from "dayjs";
import sendEmail from "../utils/send-email.js";

const reminders = [7, 5, 2, 1];

const workflowServer = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await context.run(
    "check-subscription",
    async (req, res) => {
      return await prisma.subscription.findUnique({
        where: {
          id: subscriptionId,
        },
        include: { user: true },
      });
    },
  );
  console.log("the subscription from workflow : ", subscription);
  if (!subscription || subscription.status != "ACTIVE") {
    console.log("Subscription not found or not active");
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log("Subscription already expired");
    return;
  }

  for (let daysBefore = 0; daysBefore < reminders.length; daysBefore++) {
    const reminde = renewalDate.subtract(reminders[daysBefore], "day");

    if (reminde.isAfter(dayjs())) {
      await sleepUntilReminder(
        `reminder ${reminders[daysBefore]} days`,
        reminde,
        context,
      );
    }

    await triggerReminder(
      `${reminders[daysBefore]} days before reminder`,
      context,
      subscription,
    );
  }
});

export default workflowServer;

const sleepUntilReminder = async (label, date, context) => {
  console.log(`Sleeping untile ${label} reminde at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (label, context, subscription) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
    try {
      sendEmail({
        to: subscription.user.email,
        type: label,
        subscription,
      });
    } catch (error) {
      console.error(`Error while sending ${label} reminder: `, error);
    }
  });
};
