export type FormSource = 'contact' | 'consultation';

export type InquiryStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal_sent'
  | 'won'
  | 'lost';

export interface InquiryPayload {
  form_source: FormSource;
  full_name?: string;
  email: string;
  phone?: string;
  company_name?: string;
  service?: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  turnstile_token?: string;
  website?: string;
}

export interface InquirySubmitResult {
  success: boolean;
  id?: string;
}
