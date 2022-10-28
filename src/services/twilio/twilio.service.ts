import config from 'config';
import twilio from 'twilio';

const { accountsid, authtoken, servicenumber } = config.get<{
  accountsid: string;
  authtoken: string;
  servicenumber: string;
  receivernumber: string;
}>('twilio');

class TwilioService {
  private client: twilio.Twilio = twilio(accountsid, authtoken);

  public async sendWhatsApp(to: string, body: string) {
    const messageOptions = {
      from: `whatsapp:${servicenumber}`,
      body,
      to: `whatsapp:${to}`,
    };
    await this.client.messages.create(messageOptions);
  }
}

export default new TwilioService();
