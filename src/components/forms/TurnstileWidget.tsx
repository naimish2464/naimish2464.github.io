import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef } from 'react';

interface TurnstileWidgetProps {
  onTokenChange: (token: string) => void;
  onExpire?: () => void;
}

const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export function TurnstileWidget({ onTokenChange, onExpire }: TurnstileWidgetProps) {
  const turnstileRef = useRef<TurnstileInstance>(null);

  if (!siteKey) {
    return null;
  }

  return (
    <Turnstile
      ref={turnstileRef}
      siteKey={siteKey}
      onSuccess={onTokenChange}
      onExpire={() => {
        onTokenChange('');
        onExpire?.();
        turnstileRef.current?.reset();
      }}
      onError={() => {
        onTokenChange('');
      }}
      options={{
        theme: 'dark',
        size: 'flexible',
      }}
    />
  );
}

export function isTurnstileRequired(): boolean {
  return Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY);
}
