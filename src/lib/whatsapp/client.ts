import type { WhatsAppMessage, WhatsAppIncomingMessage } from './types';

const WHATSAPP_API_URL = 'https://graph.facebook.com/v21.0';

export class WhatsAppClient {
  private accessToken: string;
  private phoneNumberId: string;

  constructor(accessToken: string, phoneNumberId: string) {
    this.accessToken = accessToken;
    this.phoneNumberId = phoneNumberId;
  }

  async sendMessage(to: string, message: string): Promise<{ messaging_product: string; to: string; type: string; text: { body: string } }> {
    const payload: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: {
        body: message,
      },
    };

    const response = await fetch(
      `${WHATSAPP_API_URL}/${this.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
    }

    return payload;
  }

  async sendTemplate(
    to: string,
    templateName: string,
    languageCode: string = 'en_US',
    components?: WhatsAppMessage['template']['components']
  ): Promise<void> {
    const payload: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: languageCode,
        },
        components,
      },
    };

    const response = await fetch(
      `${WHATSAPP_API_URL}/${this.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
    }
  }

  async sendInteractiveButtons(
    to: string,
    bodyText: string,
    buttons: { id: string; title: string }[]
  ): Promise<void> {
    const payload = {
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: {
          text: bodyText,
        },
        action: {
          buttons: buttons.map((btn) => ({
            type: 'reply',
            reply: {
              id: btn.id,
              title: btn.title.substring(0, 20), // WhatsApp max 20 chars
            },
          })),
        },
      },
    };

    const response = await fetch(
      `${WHATSAPP_API_URL}/${this.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
    }
  }

  async sendList(
    to: string,
    bodyText: string,
    buttonText: string,
    sections: {
      title: string;
      rows: { id: string; title: string; description?: string }[];
    }[]
  ): Promise<void> {
    const payload = {
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: {
        type: 'list',
        body: {
          text: bodyText,
        },
        action: {
          button: buttonText,
          sections,
        },
      },
    };

    const response = await fetch(
      `${WHATSAPP_API_URL}/${this.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
    }
  }

  verifyWebhookMode(mode: string, token: string): boolean {
    return mode === 'subscribe';
  }

  verifyWebhookToken(token: string): boolean {
    return token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  }
}

export function createWhatsAppClient(): WhatsAppClient {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    throw new Error('WhatsApp credentials not configured');
  }

  return new WhatsAppClient(accessToken, phoneNumberId);
}

export function parseIncomingMessage(body: WhatsAppIncomingMessage) {
  const entry = body.entry?.[0];
  const change = entry?.changes?.[0];
  const message = change?.value?.messages?.[0];

  if (!message) {
    return null;
  }

  return {
    from: message.from,
    id: message.id,
    timestamp: message.timestamp,
    type: message.type,
    text: message.text?.body,
    buttonPayload: message.button?.payload,
  };
}
