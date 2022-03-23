const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const CLIENT_ID =
  "762272306-dj903jlne84pcpmnh2lnrdc3cprqu1gn.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04jWZR6HJHUqKCgYIARAAGAQSNwF-L9Irr8jePP3lbT7_LrB2W8cecGZdmIB7QhUzaL1UdcHp3sfL4CxhDjdkwH8ScNyjOm2Xams";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports.sendMail = async (link, receiver) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ejjhamza23@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mail0ptions = {
      from: "Docker Hotel Booking App <ejjhamza23@gmail.com>",
      to: receiver,
      subject: "Reset password for your docker hotel booking app",
      html: `<h1>Click link to reset your password</h>
      <p>${link}<p/>`,
    };
    const result = await transport.sendMail(mail0ptions);
    return result;
  } catch (err) {
    console.log(err);
  }
};
