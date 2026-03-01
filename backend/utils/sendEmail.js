import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject || "GYM WEBSITE CONTACT",
    text: `${options.message}\n\nSent by: ${options.userEmail}`,
  };

  await transporter.sendMail(mailOptions);
};