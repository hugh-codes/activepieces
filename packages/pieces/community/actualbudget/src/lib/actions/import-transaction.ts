import { actualBudgetAuth } from '../..';
import {
  Property,
  Validators,
  createAction,
} from '@activepieces/pieces-framework';
import { Transaction } from '../common/models';
import * as api from '@actual-app/api';
import os from 'os';

export const importTransaction = createAction({
  auth: actualBudgetAuth,
  name: 'import_transaction',
  displayName: 'Import Transaction',
  description: 'Add a transactions.',
  props: {
    account_id: Property.ShortText({
      displayName: 'Account ID',
      description: 'ID of the account you want to import a transaction to',
      required: true,
    }),
    date: Property.DateTime({
      displayName: 'Date',
      description: 'Date the transaction took place',
      required: true,
    }),
    payee_name: Property.ShortText({
      displayName: 'Payee Name',
      description: 'Name of the payee',
      required: false,
    }),
    amount: Property.Number({
      displayName: 'Amount',
      description: 'The dollar value of the transaction',
      required: false,
      validators: [Validators.number],
    }),
    category: Property.ShortText({
      displayName: 'Category ID',
      description: 'ID of the transaction category',
      required: false,
    }),
    notes: Property.LongText({
      displayName: 'Notes',
      description: 'Additional notes about the transaction',
      required: false,
    }),
    imported_id: Property.ShortText({
      displayName: 'Imported ID',
      description: 'Unique ID given by the bank for importing',
      required: false,
    }),
    transfer_id: Property.ShortText({
      displayName: 'Transfer ID',
      description: 'ID of the transaction in the other account for the transfer',
      required: false,
    }),
    cleared: Property.Checkbox({
      displayName: 'Cleared',
      description: 'Flag indicating if the transaction has cleared or not',
      required: false,
    }),
    imported_payee: Property.ShortText({
      displayName: 'Imported Payee',
      description: 'Raw description when importing, representing the original value',
      required: false,
    }),
    subtransactions: Property.Json({
      displayName: 'Subtransactions',
      description: 'Array of subtransactions for a split transaction',
      required: false,
    }),
  },

  async run({ auth, propsValue: { account_id, payee_name, date, amount, category } }) {
    
    const formattedDate = new Date(date).toISOString().split('T')[0];

    const transaction: Transaction = {
      payee_name,
      date: formattedDate,
      amount: amount !== undefined ? Math.round(amount * 100) : undefined,
      category,
      account: account_id
    };

    await api.init({
      // Budget data will be cached locally here, in subdirectories for each file.
      dataDir: os.tmpdir(),

      serverURL: auth.server_url,
      password: auth.password,
    });

    await api.downloadBudget(auth.sync_id);

    const res = await api.importTransactions(account_id,[transaction]);

    await api.shutdown();

    return res;
  },
});
