import { useState } from 'react';
import { useInquiryForm } from '../../hooks/useInquiryForm';
import { FormAlert } from './FormAlert';
import { HoneypotField } from './HoneypotField';
import { TurnstileWidget, isTurnstileRequired } from './TurnstileWidget';
import { inputClassName, labelClassName, selectClassName, submitButtonClassName } from './formStyles';

const SERVICE_OPTIONS = [
  'Business Websites',
  'Web Applications',
  'AI Automation',
  'API Integrations',
  'Other',
];

const BUDGET_OPTIONS = ['<$500', '$500-$1000', '$1000-$2500', '$2500+', 'Not sure yet'];

const TIMELINE_OPTIONS = [
  'ASAP (within 2 weeks)',
  '1 month',
  '2-3 months',
  '3+ months',
  'Flexible',
];

export function ConsultationForm() {
  const [turnstileToken, setTurnstileToken] = useState('');
  const { status, errorMessage, isSubmitting, isSuccess, handleSubmit } = useInquiryForm({
    formSource: 'consultation',
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isTurnstileRequired() && !turnstileToken) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    await handleSubmit(
      {
        full_name: String(formData.get('full_name') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        phone: String(formData.get('phone') ?? '').trim(),
        company_name: String(formData.get('company_name') ?? '').trim() || undefined,
        service: String(formData.get('service') ?? '').trim(),
        budget_range: String(formData.get('budget_range') ?? '').trim(),
        timeline: String(formData.get('timeline') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
        turnstile_token: turnstileToken || undefined,
      },
      form
    );

    setTurnstileToken('');
  };

  return (
    <form onSubmit={onSubmit} className="relative space-y-6" noValidate>
      <HoneypotField />

      {isSuccess && (
        <FormAlert
          type="success"
          message="Your consultation request was submitted. I'll reach out within 24 hours to schedule your free call."
        />
      )}

      {status === 'error' && errorMessage && (
        <FormAlert type="error" message={errorMessage} />
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="consultation-full-name" className={labelClassName}>
            Full Name
          </label>
          <input
            id="consultation-full-name"
            type="text"
            name="full_name"
            required
            disabled={isSubmitting}
            className={inputClassName}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="consultation-email" className={labelClassName}>
            Email
          </label>
          <input
            id="consultation-email"
            type="email"
            name="email"
            required
            disabled={isSubmitting}
            className={inputClassName}
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="consultation-phone" className={labelClassName}>
            WhatsApp Number
          </label>
          <input
            id="consultation-phone"
            type="tel"
            name="phone"
            required
            disabled={isSubmitting}
            className={inputClassName}
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label htmlFor="consultation-company" className={labelClassName}>
            Company Name
          </label>
          <input
            id="consultation-company"
            type="text"
            name="company_name"
            disabled={isSubmitting}
            className={inputClassName}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="consultation-service" className={labelClassName}>
            Service Required
          </label>
          <select
            id="consultation-service"
            name="service"
            required
            disabled={isSubmitting}
            className={selectClassName}
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="consultation-budget" className={labelClassName}>
            Budget Range
          </label>
          <select
            id="consultation-budget"
            name="budget_range"
            required
            disabled={isSubmitting}
            className={selectClassName}
            defaultValue=""
          >
            <option value="" disabled>
              Select budget range
            </option>
            {BUDGET_OPTIONS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="consultation-timeline" className={labelClassName}>
          Expected Timeline
        </label>
        <select
          id="consultation-timeline"
          name="timeline"
          required
          disabled={isSubmitting}
          className={selectClassName}
          defaultValue=""
        >
          <option value="" disabled>
            Select expected timeline
          </option>
          {TIMELINE_OPTIONS.map((timeline) => (
            <option key={timeline} value={timeline}>
              {timeline}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="consultation-message" className={labelClassName}>
          Project Description
        </label>
        <textarea
          id="consultation-message"
          name="message"
          rows={5}
          maxLength={2000}
          required
          disabled={isSubmitting}
          className={`${inputClassName} resize-vertical`}
          placeholder="Describe your project goals, challenges, and what success looks like..."
        />
      </div>

      <TurnstileWidget onTokenChange={setTurnstileToken} onExpire={() => setTurnstileToken('')} />

      <button
        type="submit"
        disabled={isSubmitting || (isTurnstileRequired() && !turnstileToken)}
        className={submitButtonClassName}
      >
        {isSubmitting ? (
          <>
            <i className="ri-loader-4-line animate-spin mr-2"></i>
            SUBMITTING...
          </>
        ) : (
          <>
            REQUEST FREE CONSULTATION <i className="ri-calendar-check-line ml-2"></i>
          </>
        )}
      </button>
    </form>
  );
}
