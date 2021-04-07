import { Schema, model, Document, Model, ObjectId } from 'mongoose';

export interface ITransaction extends Document {
  value: number;
  date: Date;
  userId: ObjectId;
}

const TransactionSchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const Transaction: Model<ITransaction> = model('transaction', TransactionSchema);
