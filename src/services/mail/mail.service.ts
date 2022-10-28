import nodeMailer from 'nodemailer';
import config from 'config';

const { email, password } = config.get<{ email: string; password: string }>(
  'google'
);

const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: email,
    pass: password,
  },
});

class MailService {
  public async send(subject: string, htmlMessage: string, to: string = email) {
    const mailOptions = {
      from: 'The Morfi',
      to,
      subject,
      html: htmlMessage,
    };
    await transporter.sendMail(mailOptions);
  }
}

export default new MailService();
