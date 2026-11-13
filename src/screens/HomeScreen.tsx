import { StyleSheet, Text, View } from 'react-native';
import CurrencyCard from '../components/CurrencyCard';

type Expense = {
  id: string;
  title: string;
  amount: number;
};

const expenses: Expense[] = [
  { id: '1', title: 'Тамақ', amount: 2500 },
  { id: '2', title: 'Автобус', amount: 200 },
  { id: '3', title: 'Кино', amount: 1800 },
];

export default function HomeScreen() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Жалпы шығын</Text>
      <Text style={styles.total}>{total} ₸</Text>
      <CurrencyCard totalKzt={total} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  label: { fontSize: 16, color: '#6B7280' },
  total: { fontSize: 40, fontWeight: 'bold', color: '#1F2A44' },
});