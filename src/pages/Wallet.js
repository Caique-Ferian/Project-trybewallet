import React from 'react';
import Header from '../components/Header';
import SpendForms from '../components/SpendForms';
import WalletTable from '../components/WalletTable';

export default function Wallet() {
  return (
    <div>
      <Header />
      <SpendForms />
      <WalletTable />
    </div>);
}
