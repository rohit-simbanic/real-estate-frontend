import emailjs from "@emailjs/browser";
import { MailPayloadType } from "./utils";

export const sendMail = async (templateParams: any) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID_CONTACT!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY_CONTACT!;

  try {
    const res = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
