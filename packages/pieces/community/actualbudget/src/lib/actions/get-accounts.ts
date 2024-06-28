import { actualBudgetAuth } from '../..';
import { createAction } from '@activepieces/pieces-framework';
import * as api from '@actual-app/api';
import os from 'os';


export const getAccounts = createAction({
  auth: actualBudgetAuth,
  name: 'get_accounts',
  displayName: 'Get Accounts',
  description: 'Get your accounts',
  props: {},
  async run(context) {

    await api.init({
      // Budget data will be cached locally here, in subdirectories for each file.
      dataDir: os.tmpdir(),

      serverURL: context.auth.server_url,
      password: context.auth.password,
    });

    await api.downloadBudget(context.auth.sync_id);

    const accounts = await api.getAccounts();
    await api.shutdown();

    return accounts;
  },
});
