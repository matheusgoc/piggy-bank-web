import BaseService from './BaseService';
import { TransactionModel } from '../models/TransactionModel';
import moment from 'moment';
import { AxiosResponse } from 'axios';
import { ReportModel } from '../models/ReportModel';

interface TransactionLoad {
  transactions: TransactionModel[],
  reports: {
    general: ReportModel
    monthly: ReportModel
  }
}

/**
 * TransactionsService
 * A service to handle the transaction's persistence at the API web service
 *
 * @extends BaseService
 */
export default class TransactionService extends BaseService {

  // Load the transactions list and reports
  async load(year, month):Promise<TransactionLoad | undefined> {

    try {

      let uri = 'transactions/' + year + '/' + month + '/' + moment().format('Z')
      const res: AxiosResponse = await this.api.get(uri)

      const transactions = res.data.transactions.map((item): TransactionModel => {
        return this.mapToStore(item)
      })

      const reports = res.data.reports

      return { transactions, reports }

    } catch(error) {

      const method = 'TransactionsServiceApi.load'
      const msg = 'Unable to retrieve transactions from the server'
      this.handleHttpError(method, msg, error, false)
    }
  }

  // Persist a transaction in the server
  async save(transaction: TransactionModel, showError = true): Promise<TransactionModel | undefined>{

    try {

      const uri =  (transaction.id)? 'transactions/' + transaction.id : 'transactions'
      let data = this.mapToApi(transaction)

      const res: AxiosResponse = await this.api.post(uri, data)

      return this.mapToStore(res.data)

    } catch (error) {

      const method = 'TransactionsServiceApi.save'
      let msg = 'Unable to save the transaction due to a server error. Try again later!'
      this.handleHttpError(method, msg, error, showError)
    }
  }

  // Remove the transaction
  async delete(transaction: TransactionModel):Promise<void> {

    try {

      if (transaction.id) {
        await this.api.delete('transactions/' + transaction.id)
      }

    } catch (error) {

      const method = 'TransactionsServiceApi.delete'
      let msg = 'Unable to remove the transaction due to a server error. Try again later!'
      this.handleHttpError(method, msg, error)
    }
  }

  // Map transaction to save it in the server
  private mapToApi(transaction: TransactionModel): object {
    return {
      id: transaction.id,
      type: transaction.type,
      category: transaction.category.name,
      amount: transaction.amount,
      place: transaction.place,
      description: transaction.description,
      ordered_at: moment(transaction.timestamp).format(),
      is_receipt_removed: transaction.isReceiptRemoved,
    }
  }

  // Map transaction from the server to TransactionModel
  private mapToStore(transaction): TransactionModel {
    return {
      id: transaction['id'],
      amount: transaction['amount'],
      type: transaction['type'],
      category: transaction['category'],
      place: transaction['place'],
      description: transaction['description'],
      receipt: transaction['receipt'],
      isNewReceipt: false,
      timestamp: transaction['ordered_at'],
      orderDate: new Date(transaction['ordered_at']),
      orderTime: new Date(transaction['ordered_at']),
      isOwner: transaction['is_owner'],
      currency: transaction['currency'],
      currencyExchange: transaction['currencyExchange'],
      isReceiptRemoved: false,
    }
  }
}