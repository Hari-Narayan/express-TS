import { createTransport } from "nodemailer";

import configs from "../configs";

export default class MailHelper {
  static async mailer({ to, subject = "", text = "", html = "" }: any) {
    try {
      let mailOptions: any = { to, subject, from: configs.mailSender };

      if (html) mailOptions.html = html;
      if (text) mailOptions.text = text;

      // list of receivers
      if (Array.isArray(to)) mailOptions.to = to.join(", ");

      const transporter: any = createTransport({
        secure: false, // true for port 465, false for other ports
        host: configs.mailHost,
        port: configs.mailPort,
        auth: {
          user: configs.mailUser, // generated ethereal user
          pass: configs.mailPassword, // generated ethereal password
        },
      });

      // send mail with defined transport object
      const info = await transporter.sendMail(mailOptions);
      console.info("Message sent: %s", info.messageId);
    } catch (error) {
      throw error;
    }
  }
}
