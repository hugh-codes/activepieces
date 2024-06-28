import { actualBudgetAuth } from '../..';
import {
  Property,
  Validators,
  createAction,
} from '@activepieces/pieces-framework';
import { Transaction } from '../common/models';
import * as api from '@actual-app/api';
import os from 'os';

export const importTransactions = createAction({
  auth: actualBudgetAuth,
  name: 'import_transactions',
  displayName: 'Import Transactions',
  description: 'Import Transactions',
  props: {
    account_id: Property.ShortText({
      displayName: 'Account ID',
      description: 'ID of the account you want to import a transaction to',
      required: true,
    }),
    transactions: Property.Json({
        displayName: 'Transactions',
        description: 'A json array of the transaction object',
        required: true,
        defaultValue: [{"payee_name": "Kroger", "date": "2024-12-25", "amount": 1200 }]
    })    
  },

  async run({ auth, propsValue: { account_id, transactions } }) {
    
    await api.init({
      // Budget data will be cached locally here, in subdirectories for each file.
      dataDir: os.tmpdir(),

      serverURL: auth.server_url,
      password: auth.password,
    });

    await api.downloadBudget(auth.sync_id);

    const res = await api.importTransactions(account_id, transactions);

    await api.shutdown();

    return res;
  },
});
