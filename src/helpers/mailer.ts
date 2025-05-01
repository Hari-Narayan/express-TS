import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.SMTP_SECURE === 'true', // use TLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function mailer({ to, subject = '', text = '', html = '' }: any) {
  let mailOptions: any = {
    to: to,
    subject,
    from: process.env.MAIL_SENDER, // sender address
  };

  if (html) mailOptions.html = html;
  if (text) mailOptions.text = text;

  // list of receivers
  if (Array.isArray(to)) mailOptions.to = to.join(', ');

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.info('Message sent: %s', info.messageId);
  } catch (error) {
    console.error({ error });
  }
}

export default mailer;
