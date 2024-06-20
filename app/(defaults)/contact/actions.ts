import emailjs from "@emailjs/browser";

const sendMail = async (templateParams: any) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_HOME!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

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

export default sendMail;
