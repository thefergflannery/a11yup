import { Mailchimp } from '@mailchimp/mailchimp_marketing';

const MAILCHIMP_API_KEY = '5e72e52c0b955cb7c1edf5cd60bc6bdb-us21';
const MAILCHIMP_LIST_ID = 'YOUR_LIST_ID'; // You'll need to replace this with your actual list ID
const MAILCHIMP_SERVER_PREFIX = 'us21';

Mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
});

export async function subscribe(email: string) {
  try {
    await Mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    });
    return { success: true };
  } catch (error: any) {
    console.error('Mailchimp subscription error:', error);
    return {
      success: false,
      message: error.response?.body?.detail || 'Failed to subscribe to the mailing list.',
    };
  }
} 