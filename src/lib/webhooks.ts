/**
 * Webhook notification system for Slack and Discord integrations.
 * Configure webhook URLs via environment variables:
 * - SLACK_WEBHOOK_URL: Slack incoming webhook URL
 * - DISCORD_WEBHOOK_URL: Discord webhook URL
 */

type WebhookEvent =
  | 'new_lead'
  | 'lead_status_change'
  | 'new_project'
  | 'payment_received'
  | 'message_received';

interface WebhookPayload {
  [key: string]: unknown;
}

function formatSlackMessage(event: WebhookEvent, data: WebhookPayload): object {
  const eventLabels: Record<WebhookEvent, string> = {
    new_lead: 'New Lead',
    lead_status_change: 'Lead Status Update',
    new_project: 'New Project',
    payment_received: 'Payment Received',
    message_received: 'New Message',
  };

  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `${eventLabels[event]} | Blacklight Web Designs`,
      },
    },
    {
      type: 'section',
      fields: Object.entries(data).map(([key, value]) => ({
        type: 'mrkdwn',
        text: `*${key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}:*\n${value}`,
      })),
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Sent at ${new Date().toISOString()}`,
        },
      ],
    },
  ];

  return { blocks };
}

function formatDiscordMessage(event: WebhookEvent, data: WebhookPayload): object {
  const eventLabels: Record<WebhookEvent, string> = {
    new_lead: 'New Lead',
    lead_status_change: 'Lead Status Update',
    new_project: 'New Project',
    payment_received: 'Payment Received',
    message_received: 'New Message',
  };

  const colorMap: Record<WebhookEvent, number> = {
    new_lead: 0xD7FF00, // Signal Lime
    lead_status_change: 0x3B82F6,
    new_project: 0x10B981,
    payment_received: 0x8B5CF6,
    message_received: 0xF59E0B,
  };

  return {
    embeds: [
      {
        title: eventLabels[event],
        color: colorMap[event],
        fields: Object.entries(data).map(([key, value]) => ({
          name: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          value: String(value),
          inline: true,
        })),
        footer: {
          text: 'Blacklight Web Designs',
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

export async function sendWebhookNotification(
  event: WebhookEvent,
  data: WebhookPayload
): Promise<void> {
  const slackUrl = process.env.SLACK_WEBHOOK_URL;
  const discordUrl = process.env.DISCORD_WEBHOOK_URL;

  const promises: Promise<Response>[] = [];

  if (slackUrl) {
    promises.push(
      fetch(slackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatSlackMessage(event, data)),
      })
    );
  }

  if (discordUrl) {
    promises.push(
      fetch(discordUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatDiscordMessage(event, data)),
      })
    );
  }

  if (promises.length > 0) {
    try {
      await Promise.allSettled(promises);
    } catch (err) {
      console.error('Webhook notification failed:', err);
    }
  }
}
