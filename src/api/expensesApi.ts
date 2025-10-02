import type { Expense } from '../types';

export const fetchExpenses = async (): Promise<Expense[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const dummyExpenses: Expense[] = [
    { id: 'exp1', date: '2025-09-29', description: 'Office Rent', category: 'Rent', amount: 1500 },
    { id: 'exp2', date: '2025-09-28', description: 'Internet Bill', category: 'Utilities', amount: 80 },
  ];

  return dummyExpenses;
};

export const createExpense = async (data: Omit<Expense, 'id'>): Promise<Expense> => {
    console.log('Creating new expense with data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newExpense: Expense = {
        ...data,
        id: `EXP-${Date.now()}`,
    };
    return newExpense;
};