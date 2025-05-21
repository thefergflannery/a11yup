declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpConfig {
    apiKey: string;
    server: string;
  }

  interface AddListMemberOptions {
    email_address: string;
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
  }

  interface MailchimpResponse {
    id: string;
    email_address: string;
    status: string;
  }

  interface MailchimpError {
    response?: {
      body?: {
        detail?: string;
      };
    };
    message?: string;
  }

  export function setConfig(config: MailchimpConfig): void;
  export const lists: {
    addListMember: (listId: string, options: AddListMemberOptions) => Promise<MailchimpResponse>;
  };
} 