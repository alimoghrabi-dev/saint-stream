import { Schema, models, model, Document } from "mongoose";

export interface IAccount extends Document {
  user: IAccount;
  prompt: string;
  createdAt: Date;
}

const accountSchema = new Schema({
  user: {
    type: Object,
    required: true,
    ref: "Account",
  },
  prompt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = models.Account || model("Account", accountSchema);

export default Account;
