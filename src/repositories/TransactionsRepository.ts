import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateParams {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  all(): Transaction[] {
    return [...this.transactions];
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acumulator, current) => {
      if (current.type === 'income') {
        return { ...acumulator, value: acumulator.value + current.value };
      }
      return acumulator;
    }, new Transaction({ title: '', value: 0, type: 'income' }));

    const outcome = this.transactions.reduce((acumulator, current) => {
      if (current.type === 'outcome') {
        return { ...acumulator, value: acumulator.value + current.value };
      }
      return acumulator;
    }, new Transaction({ title: '', value: 0, type: 'outcome' }));

    return {
      income: income.value,
      outcome: outcome.value,
      total: income.value - outcome.value,
    };
  }

  create({ title, value, type }: CreateParams): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
