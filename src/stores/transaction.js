import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
export const useTransactionStore = defineStore('transaction', () => {
  const state = reactive({
    income: [],
    expense: [],
    total: [],
    totalIncome: 0,
    totalExpense: 0,
  });
  async function fetchTransactions() {
    try {
      const incomeRes = await axios.get('http://localhost:3000/income');
      const expenseRes = await axios.get('http://localhost:3000/expense');
      state.income = incomeRes.data;
      state.expense = expenseRes.data;
      state.total = [...incomeRes.data, ...expenseRes.data];
      state.totalIncome = state.income.reduce(
        (acc, cur) => (acc += parseInt(cur.amount)),
        0
      );
      state.totalExpense = state.expense.reduce(
        (acc, cur) => (acc += parseInt(cur.amount)),
        0
      );
      console.log(totalIncome.value);
    } catch (error) {
      alert('TodoList 데이터 통신 Err 발생');
      console.log(error);
    }
  }

  fetchTransactions();

  // const transactions = ref([
  //   {
  //     id: 1,
  //     date: '2024-06-10',
  //     description: '서브웨이',
  //     method: '카드',
  //     amount: -30000,
  //     type: 'expense',
  //   },
  //   {
  //     id: 2,
  //     date: '2024-06-10',
  //     description: '용돈',
  //     method: '현금',
  //     amount: 50000,
  //     type: 'income',
  //   },
  //   {
  //     id: 3,
  //     date: '2024-06-07',
  //     description: '용돈',
  //     method: '현금',
  //     amount: 50000,
  //     type: 'income',
  //   },
  //   {
  //     id: 4,
  //     date: '2024-06-07',
  //     description: '용돈',
  //     method: '현금',
  //     amount: 50000,
  //     type: 'income',
  //   },
  // ]);
  // const totalBalance = computed(() => income.value - expenses.value);
  // const getTransactionsForMonth = (date) => {
  //   const month = date.getMonth();
  //   const year = date.getFullYear();
  //   return transactions.value.filter((transaction) => {
  //     const transactionDate = new Date(transaction.date);
  //     return (
  //       transactionDate.getMonth() === month &&
  //       transactionDate.getFullYear() === year
  //     );
  //   });
  // };
  // const getIncomeForMonth = (date) => {
  //   return getTransactionsForMonth(date)
  //     .filter((transaction) => transaction.amount > 0)
  //     .reduce((sum, transaction) => sum + transaction.amount, 0);
  // };
  // const getExpensesForMonth = (date) => {
  //   return getTransactionsForMonth(date)
  //     .filter((transaction) => transaction.amount < 0)
  //     .reduce((sum, transaction) => sum + transaction.amount, 0);
  // };
  // const getTotalBalanceForMonth = (date) => {
  //   return getIncomeForMonth(date) + getExpensesForMonth(date);
  // };

  // async function addIncomeTransaction(transaction) {
  //   try {
  //     const addResponse = await axios.post(
  //       'http://localhost:3000/income',
  //       transaction
  //     );
  //     if (addResponse.status !== 201) return alert('데이터 전송 실패');
  //   } catch (error) {
  //     alert('데이터 통신 오류 발생');
  //     console.error(error);
  //   }
  // }
  // async function addExpenseTransaction(transaction) {
  //   try {
  //     const addResponse = await axios.post(
  //       'http://localhost:3000/expense',
  //       transaction
  //     );
  //     if (addResponse.status !== 201) return alert('데이터 전송 실패');
  //   } catch (error) {
  //     alert('데이터 통신 오류 발생');
  //     console.error(error);
  //   }
  // }
  const income = computed(() => state.income);
  const expense = computed(() => state.expense);
  const total = computed(() => state.total);
  const totalIncome = computed(() => state.totalIncome);
  const totalExpense = computed(() => state.totalExpense);

  return {
    income,
    expense,
    total,
    // transactions,
    // totalBalance,
    // addTransaction,
    // getTransactionsForMonth,
    // getIncomeForMonth,
    // getExpensesForMonth,
    // getTotalBalanceForMonth,
    fetchTransactions,
  };
});
