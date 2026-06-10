import nodemailer from "nodemailer";

// Reuse the working Gmail-SMTP config (see forgot-password.ts). Prefer env vars,
// fall back to the existing hardcoded values so behaviour is unchanged if unset.
const SMTP_USER = process.env.SMTP_USER || "e69808220@gmail.com";
const SMTP_PASS = process.env.SMTP_PASS || "vrpn mxqp qmpl bcjz";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

type Attachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export const sendMail = async (options: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: Attachment[];
}) => {
  await transporter.sendMail({
    from: SMTP_USER,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments,
  });
};
