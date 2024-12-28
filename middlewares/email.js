const { createTransport } = require("nodemailer");

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "dondaharsh04@gmail.com",
    pass: "ywre yazy vnhj zjwy", // App password
  },
});

const sendverification = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Harsh Donda 👻" <dondaharsh04@gmail.com>',
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${verificationCode} for creating Harsh Donda's account.`,
      html: `<b>Your verification code is: ${verificationCode} \n Thanks you to join us.🙏🏽</b>`,
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendverification;
