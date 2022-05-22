const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const { GMAIL_PASS, GMAIL_USER, APP_URL } = require("./env");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

module.exports = {
  sendConfirmationEmail: (email, verifyToken, name) => {
    transport.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".html",
          partialsDir: path.resolve("./src/template/email"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./src/template"),
        extName: ".html",
      })
    );
    const mailOptions = {
      from: "HIREJOB",
      to: email,
      subject: "Please Confirm Your Account",
      text: "Confirm your email",
      template: "emailConfirmation",
      context: {
        url: `${APP_URL}/auth/verify-email?token=${verifyToken}`,
        name: `${name}`,
      },
    };

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};
