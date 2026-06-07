import { useState, useCallback } from 'react';

export function useError() {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: any) => {
    const message = err instanceof Error ? err.message : String(err);
    setError(message);

    // Auto-close after 5 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}
