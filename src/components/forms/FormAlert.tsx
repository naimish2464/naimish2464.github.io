interface FormAlertProps {
  type: 'success' | 'error';
  message: string;
}

export function FormAlert({ type, message }: FormAlertProps) {
  const styles =
    type === 'success'
      ? 'bg-green-500/10 border-green-500/30 text-green-300'
      : 'bg-red-500/10 border-red-500/30 text-red-300';

  const icon = type === 'success' ? 'ri-check-line' : 'ri-error-warning-line';

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${styles}`}
    >
      <i className={`${icon} text-lg shrink-0 mt-0.5`} aria-hidden="true"></i>
      <p>{message}</p>
    </div>
  );
}
