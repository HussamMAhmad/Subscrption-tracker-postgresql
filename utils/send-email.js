import transporter, { myEmail } from "../config/nodmailer.js";
import { emailTemplates } from "./email-template.js";
import dayjs from "dayjs";

const sendEmail = async ({ to, type, subscription }) => {
  if (!to || !type) {
    throw new Error("Missing required parameters: to and type are required");
  }
  try {
    const template = emailTemplates.find((t) => t.label === type);

    if (!template) {
      throw Error("there is no type or no template");
    }

    const mailInfo = {
      userName: subscription.user.name,
      subscriptionName: subscription.name,
      renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
      planName: subscription.name,
      price: `${subscription.currency} ${subscription.price} ${subscription.frequency}`,
      paymentMethod: subscription.paymentMethod,
    };

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    transporter.sendMail(
      {
        from: myEmail,
        to: to,
        subject: subject,
        html: message,
      },
      (err, info) => {
        if (err) {
          return console.log("Email sent: ", info, "Error: ", err);
        } else {
          console.log("Email sent" + info.response);
        }
      },
    );
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};

export default sendEmail;
