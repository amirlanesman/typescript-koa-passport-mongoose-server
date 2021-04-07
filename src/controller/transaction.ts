import { Transaction } from '../entity/transation';
import { RContext } from '../types';
// import { validate, ValidationError } from 'class-validator';
// import { IUser, User } from '../entity/user';

export default class TransactionController {
  public static async getTransactions(ctx: RContext): Promise<void> {
    const transactions = await Transaction.find({ userId: ctx.state.user._id }).exec();
    if (!transactions) {
      console.log('NO TRANSACTIONS!');
      throw new Error('No transactions');
    }
    ctx.body = { transactions };
  }

  public static async insertTransaction(ctx: RContext): Promise<void> {
    const { value, date } = ctx.request.body;
    const newTransaction = new Transaction({ value, date: new Date(date), userId: ctx.state.user._id });

    const transaction = await newTransaction.save();
    if (!transaction) {
      throw new Error('There was an error saving the transaction');
    }
    ctx.body = { transaction };
  }

  public static async deleteTransaction(ctx: RContext): Promise<void> {
    const { id } = ctx.params;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      ctx.status = 404;
      return;
    }

    if (String(transaction.userId) !== String(ctx.state.user._id)) {
      ctx.status = 403;
      return;
    }

    const removed = await transaction.remove();

    if (!removed) {
      throw new Error('There was a problem deleting the transaction');
    }
    ctx.body = { id };
  }
}
