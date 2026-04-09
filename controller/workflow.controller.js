import { serve } from "@upstash/workflow/express";
import { prisma } from "../lib/prisma.js";
import dayjs from "dayjs";

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

  if (!subscription || subscription.status != "ACTIVE") {
    console.log("Subscription not found or not active");
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log("Subscription already expired");
    return;
  }

  for (const daysBefore = 0; daysBefore < reminders.length; daysBefore++) {
    const reminde = renewalDate.subtract(reminders[daysBefore], "day");

    if (reminde.isAfter(dayjs())) {
      await sleepUntilReminder(
        `reminder ${reminders[daysBefore]} days`,
        reminde,
        context,
      );
    }

    await triggerReminder(`reminder ${reminders[daysBefore]} days`, context);
  }
});

export default workflowServer;

const sleepUntilReminder = async (label, date, context) => {
  console.log(`Sleeping untile ${label} reminde at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (label, context) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
    // send Email
  });
};
