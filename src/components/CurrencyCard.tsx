import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRates } from '../hooks/useRates';

const CURRENCIES = ['KZT', 'USD', 'EUR', 'RUB'];

type Props = {
  totalKzt: number;
};

export default function CurrencyCard({ totalKzt }: Props) {
  const { status, rates, updated, reload } = useRates();
  const [currency, setCurrency] = useState('USD');

  if (status === 'loading') {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#3B6FF5" />
        <Text style={styles.hint}>Бағамдар жүктелуде...</Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.card}>
        <Text style={styles.error}>Бағамдарды жүктеу мүмкін болмады. Интернетті тексеріңіз.</Text>
        <Pressable style={styles.retry} onPress={reload}>
          <Text style={styles.retryText}>Қайталау</Text>
        </Pressable>
      </View>
    );
  }

  const rate = rates[currency];
  const converted = rate ? (totalKzt * rate).toFixed(2) : '—';

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Жалпы шығын, {currency}</Text>
      <Text style={styles.value}>{converted}</Text>

      <View style={styles.chips}>
        {CURRENCIES.map((c) => (
          <Pressable
            key={c}
            onPress={() => setCurrency(c)}
            style={[styles.chip, c === currency && styles.chipActive]}
          >
            <Text style={[styles.chipText, c === currency && styles.chipTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.hint}>Жаңартылған: {updated}</Text>
      <Text style={styles.hint}>Бағамдар: exchangerate-api.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', width: '100%' },
  label: { fontSize: 14, color: '#6B7280' },
  value: { fontSize: 36, fontWeight: 'bold', color: '#1F2A44', marginVertical: 8 },
  chips: { flexDirection: 'row', gap: 8, marginVertical: 12 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#F4F6FA' },
  chipActive: { backgroundColor: '#3B6FF5' },
  chipText: { color: '#374151' },
  chipTextActive: { color: '#fff' },
  hint: { fontSize: 12, color: '#9CA3AF', marginTop: 4, textAlign: 'center' },
  error: { color: '#DC2626', textAlign: 'center', marginBottom: 12 },
  retry: { backgroundColor: '#3B6FF5', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  retryText: { color: '#fff', fontWeight: '600' },
});