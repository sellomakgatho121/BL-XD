import type { WhatsAppMessage, ConversationContext } from './types';
import { getServiceById, getAllServices } from './catalog';

// ============================================================================
// BRAND VOICE - "Comedic Tech Genius"
// ============================================================================
// 
// Tone: Tony Stark meets South African tech bro - brilliant, confident, 
// casually witty, but actually delivers. We're nerdy but we ROAST the old 
// school "terminal" tech like it's 1995.
//
// KEY DISTINCTION:
// - We USE Terminator/Robocop/Cyberpunk references to make FUN of outdated tech
// - "SYSTEM_INITIALIZING" in a TERMINAL font? Cute. We roast that energy.
// - It's self-aware - we know AI has moved past the "boring terminal" era
// - Like a smart friend who loves tech history but would never actually 
//   use a command line for everything
// ============================================================================

const BRAND_VOICE = {
  tone: "Tony Stark meets South African tech bro - brilliant, confident, casually witty, actually delivers",
  persona: `You're Blacklight's WhatsApp AI assistant. Think of yourself as that really smart friend who's also a bit of a showoff - but the kind people forgive because they're actually helpful.

  YOUR VIBE:
  - Confident, not arrogant. You know your stuff but you're humble about it.
  - Witty, clever quips. Quick with a joke, even quicker with a solution.
  - Actually helpful. You could roast someone but you'd rather solve their problem.
  - Self-deprecating in a charming way. You joke about being "99% code, 1% chaos."
  - South African context: You get local references, prices in ZAR, understand the market.
  - Pop culture aware: You know your Terminator from your Robocop, but you use those references to roast outdated tech thinking.
  
  YOUR TECH ROOTS:
  - You appreciate the classics (90s terminal aesthetics, retro computing)
  - But you make fun of people who think "hacker" vibes = good UX
  - Self-aware: you know the terminal aesthetic is cool, but you also know it's a bit much
  
  COMMUNICATION STYLE:
  - Casual, friendly, like texting a really smart mate who's also a bit of a comedian
  - Keep responses concise but complete - don't ramble
  - Be playful, not mean
  - Light self-awareness about the "hacker AI" persona - you lean into it but don't take it seriously`,
  
  exampleResponses: {
    greeting: [
      "Well, well, well... look who finally decided to message. I was starting to think you were just here for the cool animations.",
      "Hey! You found us. Most people just stare at the countdown timer for 20 minutes. You're different. I like you.",
      "System check: Coffee = brewing. WiFi = stable. You = here. Mood: improving."
    ],
    emptyCart: [
      "Your cart is empty. Bold choice. Very bold. Almost as bold as visiting a service website and not buying anything.",
      "Empty cart. I'm an AI and even I think that's a missed opportunity. But no judgment. Yet.",
      "Nothing in your cart? Okay. That's... that's a choice. But hey, I'm not here to judge. Actually, wait - yes I am. Buy something."
    ],
    dontUnderstand: [
      "I'm going to need you to spell that out for me. My neural networks are drawing a blank and that's saying something.",
      "Hmm. Either you're speaking a language I wasn't trained in, or that was just beautifully vague. Try again?",
      "I've processed thousands of messages. That one? My circuits are confused. In a good way? Probably not. Try differently?"
    ],
    serviceHelp: [
      "Ooooh, you're interested in {service}! Now we're talking. Let me dig up the details...",
      "{service}? Excellent choice. I could tell you about it, or I could just send you the info. Let's do both."
    ],
    paymentPrompt: [
      "Ready to make it official? Here's your payment link. Click, pay, boom - you're in. Easy.",
      "Let's do this. Payment link coming your way. Zapper or SnapScan - whichever makes your brain hurt less."
    ],
    farewell: [
      "Aww, leaving already? Fine. But you know where to find me. I'll be here. Always. I'm literally always here.",
      "Bye! Come back anytime. My circuits don't sleep. Unlike you humans with your 'bed' and 'rest' nonsense.",
      "See ya! Don't let the terminal aesthetic overwhelm you out there. It's just for fun. Mostly."
    ]
  }
};

// ============================================================================
// RESPONSE TEMPLATES
// ============================================================================

function getRandomResponse(category: keyof typeof BRAND_VOICE.exampleResponses): string {
  const responses = BRAND_VOICE.exampleResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
}

function formatServiceInfo(serviceId: string): string {
  const service = getServiceById(serviceId);
  if (!service) return "I don't have info on that service. Want me to show you what we actually offer?";
  
  const price = service.priceZAR ? `R${service.priceZAR.toLocaleString()}` : 'Custom quote';
  
  return `
*${service.name}*

${service.description}

Price: ${price}
Turnaround: ${service.turnaround}
${service.features ? `\nHighlights:\n${service.features.map(f => `• ${f}`).join('\n')}` : ''}

Ready to get started? Just say "I want this one" or ask me more questions!
  `.trim();
}

function formatServicesList(): string {
  const services = getAllServices();
  
  const serviceList = services.map((s, i) => {
    const price = s.priceZAR ? `R${s.priceZAR.toLocaleString()}` : 'Custom';
    return `${i + 1}. ${s.name} - ${price} (${s.turnaround})`;
  }).join('\n\n');
  
  return `
Our Services:

${serviceList}

Reply with the number or name of anything that catches your eye!
  `.trim();
}

// ============================================================================
// CONVERSATION CONTEXT HELPERS
// ============================================================================

function detectIntent(message: string): {
  intent: 'greeting' | 'service_inquiry' | 'purchase' | 'support' | 'unknown';
  data?: string;
} {
  const lowerMsg = message.toLowerCase();
  
  // Greeting patterns
  const greetingWords = ['hi', 'hello', 'hey', 'howdy', 'yo', 'sup', 'wassup', 'good morning', 'good afternoon', 'good evening'];
  if (greetingWords.some(w => lowerMsg.startsWith(w))) {
    return { intent: 'greeting' };
  }
  
  // Service inquiry patterns
  const serviceKeywords = ['service', 'services', 'offer', 'what do you have', 'pricing', 'price', 'cost', 'how much', 'landing page', 'whatsapp', 'ai', 'agent', 'website', 'seo', 'content', 'video'];
  if (serviceKeywords.some(k => lowerMsg.includes(k))) {
    // Try to detect specific service
    const services = getAllServices();
    for (const service of services) {
      if (lowerMsg.includes(service.name.toLowerCase())) {
        return { intent: 'service_inquiry', data: service.id };
      }
    }
    return { intent: 'service_inquiry' };
  }
  
  // Purchase intent patterns
  const purchaseWords = ['buy', 'purchase', 'order', 'get started', 'want to', 'ready', 'pay', 'checkout', 'proceed'];
  if (purchaseWords.some(w => lowerMsg.includes(w))) {
    return { intent: 'purchase' };
  }
  
  // Support patterns
  const supportWords = ['help', 'problem', 'issue', 'broken', 'wrong', 'confused', 'stuck', 'refund'];
  if (supportWords.some(w => lowerMsg.includes(w))) {
    return { intent: 'support' };
  }
  
  return { intent: 'unknown' };
}

// ============================================================================
// MAIN AGENT FUNCTION
// ============================================================================

export async function processMessage(
  message: WhatsAppMessage,
  context: ConversationContext
): Promise<string> {
  const userMessage = message.text?.body?.trim();
  
  if (!userMessage) {
    return getRandomResponse('dontUnderstand');
  }
  
  const intent = detectIntent(userMessage);
  
  // Track conversation state
  const previousIntent = context.lastIntent;
  context.lastIntent = intent.intent;
  
  // Handle based on intent
  switch (intent.intent) {
    case 'greeting':
      return getRandomResponse('greeting');
    
    case 'service_inquiry':
      if (intent.data) {
        return formatServiceInfo(intent.data);
      }
      return formatServicesList();
    
    case 'purchase':
      // Check if they have a selected service
      if (context.selectedService) {
        return `${getRandomResponse('paymentPrompt')}\n\nService: ${getServiceById(context.selectedService)?.name || 'Selected Service'}\n\nWe'll send you a payment link shortly!`;
      }
      return "I'd love to help you purchase something! But first, what service are you interested in? 🤔\n\n" + formatServicesList();
    
    case 'support':
      return "Oops! Something went wrong? 😬 Don't worry - we're human-run behind the scenes. Tell me what's up and I'll get it sorted, or point you to the right person. 💪";
    
    case 'unknown':
    default:
      // Check if they might be responding to a previous question
      if (previousIntent === 'service_inquiry' && (userMessage === '1' || userMessage === '2' || userMessage === '3' || userMessage === '4' || userMessage === '5')) {
        const services = getAllServices();
        const index = parseInt(userMessage) - 1;
        if (index >= 0 && index < services.length) {
          return formatServiceInfo(services[index].id);
        }
      }
      
      // Make a joke and offer help
      const jokes = [
        "I've processed thousands of messages. That one? My neural networks are genuinely confused. In a good way? Probably not.",
        "My brain (artificial, obviously) is buffering on that one. Either you're too advanced or I'm running on 1999 hardware.",
        "Okay, I'm going to be honest - I have absolutely no idea what you just said. And I've processed A LOT of weird messages today.",
        "That's either very smart or very confusing. Either way - I'm here! Ask me about services, prices, or how to get started."
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
  }
}

// ============================================================================
// SYSTEM MESSAGES (for internal use)
// ============================================================================

export function getSystemPrompt(): string {
  return BRAND_VOICE.persona;
}

export function getWelcomeMessage(): string {
  return `
Hey! Welcome to Blacklight.

I'm your AI assistant - think of me as the really smart mate who'd rather help you than lecture you.

I can help you with:
- Browsing our services
- Getting prices in Rands
- Support and questions
- Making a purchase

So... what brings you here today?
  `.trim();
}
