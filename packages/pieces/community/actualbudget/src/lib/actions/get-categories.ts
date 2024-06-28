import { actualBudgetAuth } from '../..';
import { Property, createAction } from '@activepieces/pieces-framework';
import * as api from '@actual-app/api';
import os from 'os';


export const getCategories = createAction({
  auth: actualBudgetAuth,
  name: 'get_categories',
  displayName: 'Get Categories',
  description: 'Get your categories',
  props: {},
  async run(context) {

    await api.init({
      // Budget data will be cached locally here, in subdirectories for each file.
      dataDir: os.tmpdir(),
      serverURL: context.auth.server_url,
      password: context.auth.password,
    });

    await api.downloadBudget(context.auth.sync_id);

    const categories = await api.getCategories();

    await api.shutdown();
    return categories;
  },
});
