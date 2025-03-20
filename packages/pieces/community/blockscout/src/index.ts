
import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import {
  search,
  checkRedirect,
  getBlocks,
  getMainPageBlocks,
  getBlockByHash,
  getBlockTransactions,
  getBlockWithdrawals,
  getTransactions,
  getMainPageTransactions,
  getTransactionByHash,
  getTransactionTokenTransfers,
  getTransactionInternalTransactions,
  getTransactionLogs,
  getTransactionRawTrace,
  getTransactionStateChanges,
  getTransactionSummary,
  getAddresses,
  getAddressByHash,
  getAddressCounters,
  getAddressTransactions,
  getAddressTokenTransfers,
  getAddressLogs,
  getAddressBlocksValidated,
  getAddressTokenBalances,
  getAddressTokens,
  getAddressWithdrawals,
  getAddressCoinBalanceHistory,
  getAddressCoinBalanceHistoryByDay,
  getTokens,
  getTokenByAddress,
  getTokenTransfers,
  getTokenHolders,
  getTokenCounters,
  getTokenInstances
} from './lib/actions';

export const blockscout = createPiece({
  displayName: "Blockscout",
  description: "Blockscout is a tool for inspecting and analyzing EVM chains.",
  auth: PieceAuth.None(),
  logoUrl: 'https://imagedelivery.net/bHREz764QO9n_1kIQUR2sw/454f5276-fa63-45e3-2a4c-d8aa4bb3ee00/public',
  authors: ['Swanblocks/Reem Ayoush'],
  actions: [
    search,
    checkRedirect,
    getBlocks,
    getMainPageBlocks,
    getBlockByHash,
    getBlockTransactions,
    getBlockWithdrawals,
    getTransactions,
    getMainPageTransactions,
    getTransactionByHash,
    getTransactionTokenTransfers,
    getTransactionInternalTransactions,
    getTransactionLogs,
    getTransactionRawTrace,
    getTransactionStateChanges,
    getTransactionSummary,
    getAddresses,
    getAddressByHash,
    getAddressCounters,
    getAddressTransactions,
    getAddressTokenTransfers,
    getAddressLogs,
    getAddressBlocksValidated,
    getAddressTokenBalances,
    getAddressTokens,
    getAddressWithdrawals,
    getAddressCoinBalanceHistory,
    getAddressCoinBalanceHistoryByDay,
    getTokens,
    getTokenByAddress,
    getTokenTransfers,
    getTokenHolders,
    getTokenCounters,
    getTokenInstances
  ],
  triggers: []
});

