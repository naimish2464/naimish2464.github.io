import { useState } from 'react';
import { useInquiryForm } from '../../hooks/useInquiryForm';
import { FormAlert } from './FormAlert';
import { HoneypotField } from './HoneypotField';
import { TurnstileWidget, isTurnstileRequired } from './TurnstileWidget';
import { inputClassName, labelClassName, selectClassName, submitButtonClassName } from './formStyles';

export function ContactForm() {
  const [turnstileToken, setTurnstileToken] = useState('');
  const { status, errorMessage, isSubmitting, isSuccess, handleSubmit } = useInquiryForm({
    formSource: 'contact',
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
        budget_range: String(formData.get('budget_range') ?? '').trim() || undefined,
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
          message="Your message was sent successfully. I'll get back to you within 24 hours."
        />
      )}

      {status === 'error' && errorMessage && (
        <FormAlert type="error" message={errorMessage} />
      )}

      <div>
        <label htmlFor="contact-full-name" className={labelClassName}>
          Name
        </label>
        <input
          id="contact-full-name"
          type="text"
          name="full_name"
          required
          disabled={isSubmitting}
          className={inputClassName}
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClassName}>
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          disabled={isSubmitting}
          className={inputClassName}
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="contact-budget" className={labelClassName}>
          Budget
        </label>
        <select
          id="contact-budget"
          name="budget_range"
          disabled={isSubmitting}
          className={selectClassName}
          defaultValue=""
        >
          <option value="" disabled>
            Select your budget
          </option>
          <option value="<$500">&lt;$500</option>
          <option value="$500-$1000">$500-$1000</option>
          <option value="$1000-$2500">$1000-$2500</option>
          <option value="$2500+">$2500+</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={500}
          required
          disabled={isSubmitting}
          className={`${inputClassName} resize-vertical`}
          placeholder="Tell me about your project..."
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
            SENDING...
          </>
        ) : (
          <>
            SEND MESSAGE <i className="ri-send-plane-line ml-2"></i>
          </>
        )}
      </button>
    </form>
  );
}
