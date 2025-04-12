// Node module Imports
const nm = require("nodemailer");

const sendEmail = async (
  transporterOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  mailOptions = {}
) => {
  const mailOptions_default = {
    from: process.env.SMTP_FROM,
  };

  const transporter = nm.createTransport(transporterOptions);
  await transporter.sendMail({ ...mailOptions_default, ...mailOptions });
};

module.exports = sendEmail;
