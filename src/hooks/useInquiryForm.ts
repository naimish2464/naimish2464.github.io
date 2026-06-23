import { useCallback, useState } from 'react';
import { getUtmParams } from '../lib/utm';
import { submitInquiry } from '../lib/submitInquiry';
import type { FormSource, InquiryPayload } from '../types/inquiry';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface UseInquiryFormOptions {
  formSource: FormSource;
  onSuccess?: () => void;
}

export function useInquiryForm({ formSource, onSuccess }: UseInquiryFormOptions) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const reset = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
  }, []);

  const handleSubmit = useCallback(
    async (
      fields: Omit<InquiryPayload, 'form_source' | 'utm_source' | 'utm_medium' | 'utm_campaign'>,
      formElement: HTMLFormElement
    ) => {
      if (status === 'submitting') {
        return;
      }

      const honeypot = (formElement.elements.namedItem('website') as HTMLInputElement)?.value;
      if (honeypot) {
        setStatus('success');
        formElement.reset();
        onSuccess?.();
        return;
      }

      setStatus('submitting');
      setErrorMessage('');

      try {
        await submitInquiry({
          form_source: formSource,
          ...fields,
          ...getUtmParams(),
          website: honeypot || undefined,
        });
        setStatus('success');
        formElement.reset();
        onSuccess?.();
      } catch (error) {
        setStatus('error');
        setErrorMessage(
          error instanceof Error ? error.message : 'Something went wrong. Please try again.'
        );
      }
    },
    [formSource, onSuccess, status]
  );

  return {
    status,
    errorMessage,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    handleSubmit,
    reset,
  };
}
