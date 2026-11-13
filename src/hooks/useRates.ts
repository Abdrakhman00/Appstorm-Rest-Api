import { useCallback, useEffect, useState } from 'react';
import { RatesResponse, Status } from '../types/rates';

const URL = 'https://open.er-api.com/v6/latest/KZT';

export function useRates() {
  const [status, setStatus] = useState<Status>('loading');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [updated, setUpdated] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const res = await fetch(URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: RatesResponse = await res.json();
      if (data.result !== 'success') throw new Error('API error');
      setRates(data.rates);
      setUpdated(data.time_last_update_utc);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { status, rates, updated, reload: load };
}