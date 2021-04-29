import { TransactionModel } from './models/TransactionModel';

export const categoriesSamples = [
  "Income",
  "Auto and Transport",
  "Education",
  "Insurance",
  "Entertainment",
  "Shopping",
  "Food & Dining",
  "Coffee shops",
  "Office",
  "Others",
  "Professional Services",
  "Rent",
  "Supplies",
  "Travel",
  "Utilities and Bills",
  "Personal Care",
  "Health and Fitness",
  "Kids",
  "Taxes",
  "Gifts and Donations",
  "Investments",
  "Fees and Charges",
  "Coffee Shop",
]

export const generateCategory = (): string => {
  return categoriesSamples[Math.ceil(Math.random() * 23 - 1)]
}

export const generateTransactionsList = (): TransactionModel[] => {
  const transactions: TransactionModel[] = []
  for (let i = 0; i < 100; i++) {
    const transaction = new TransactionModel()
    transaction.id = Math.ceil(Math.random() * 10000)
    transaction.type = (Math.ceil(Math.random() * 2) - 1 === 0)? 'I' : 'E'
    transaction.category = generateCategory()
    transaction.amount = Number((Math.random() * ((transaction.type === 'I')? 120 : -120)).toFixed(2))
    transaction.place = ['ISU', 'Starbucks', 'Mac Donalds', 'Walmart', ''][Math.round(Math.random() * 4)]
    transaction.timestamp = new Date().getTime()
    transaction.orderDate = new Date()
    transaction.orderTime = new Date()
    transactions.push(transaction)
  }

  return transactions
}