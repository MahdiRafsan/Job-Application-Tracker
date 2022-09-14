const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let messageOptions = {
    from: `Job App Tracker ${process.env.SMTP_EMAIL}`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.message,
  };

  let info = await transporter.sendMail(messageOptions, (err, information) => {
    if (err) {
      console.log("Email sending error: ", err.message);
      process.exit(1);
    } else {
      console.log("Email sent successfully", information.response);
    }
  });
};

module.exports = sendEmail;
