import config from 'config';
import twilio from 'twilio';

const { accountsid, authtoken, servicenumber, servicenumberwa } = config.get<{
  accountsid: string;
  authtoken: string;
  servicenumber: string;
  servicenumberwa: string;
  receivernumber: string;
}>('twilio');

class TwilioService {
  private twilio: twilio.Twilio;

  constructor() {
    this.twilio = twilio(accountsid, authtoken);
  }

  public async send(to: string, messageBody: string, mode: 'sms' | 'whatsapp') {
    const messageOptions = {
      from: mode === 'sms' ? servicenumber : `whatsapp:${servicenumberwa}`,
      body: messageBody,
      to: `${mode === 'sms' ? '' : 'whatsapp:'}${to}`,
    };

    const response = await this.twilio.messages.create(messageOptions);

    return response;
  }
}

export default new TwilioService();
