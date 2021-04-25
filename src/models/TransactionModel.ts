import { CategoryModel } from './CategoryModel'

export class TransactionModel {
  id: number = 0
  type: 'I' | 'E' = 'E'
  category: CategoryModel | any = ''
  amount: number | any = 0
  place: string = ''
  description: string = ''
  receipt: string = ''
  isNewReceipt: boolean = false
  orderDate: Date = new Date()
  orderTime: Date = new Date()
  timestamp: number = 0
  isOwner: boolean = true
  currency: string = 'USD'
  currencyExchange: number = 0
  isReceiptRemoved: boolean = false
}