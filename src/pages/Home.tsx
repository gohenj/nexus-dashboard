import { initialUsers, initialTransactions } from '../mocks/data';
import { TrendingUp, TrendingDown, Users, DollarSign, Wallet } from 'lucide-react';

export default function Home() {
  // 1. Cálculos dos Indicadores (Cards)
  const activeUsers = initialUsers.filter(u => u.status === 'ACTIVE').length;

  const totalDepositedBRL = initialTransactions
    .filter(t => t.type === 'DEPOSIT' && t.asset === 'BRL')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalWithdrawnBRL = initialTransactions
    .filter(t => t.type === 'WITHDRAW' && t.asset === 'BRL')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const volumeBRL = totalDepositedBRL + totalWithdrawnBRL;

  // 2. Cálculo dos Saldos Totais da Plataforma
  const totalBalances = initialUsers.reduce(
    (acc, user) => {
      acc.BRL += user.balances.BRL;
      acc.BTC += user.balances.BTC;
      acc.ETH += user.balances.ETH;
      acc.USDT += user.balances.USDT;
      return acc;
    },
    { BRL: 0, BTC: 0, ETH: 0, USDT: 0 }
  );

  // 3. Pegando apenas as 5 últimas movimentações
  const recentTransactions = initialTransactions.slice(0, 5);

  // Funções de formatação para deixar os números bonitos
  const formatBRL = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  
  const formatCrypto = (value: number) => 
    value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Resumo da Plataforma</h1>

      {/* Grid de Cards de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg"><TrendingUp className="w-6 h-6 text-green-600" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Depósitos (BRL)</p>
            <p className="text-xl font-bold text-gray-900">{formatBRL(totalDepositedBRL)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-lg"><TrendingDown className="w-6 h-6 text-red-600" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Saques (BRL)</p>
            <p className="text-xl font-bold text-gray-900">{formatBRL(totalWithdrawnBRL)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg"><DollarSign className="w-6 h-6 text-blue-600" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Volume Total (BRL)</p>
            <p className="text-xl font-bold text-gray-900">{formatBRL(volumeBRL)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg"><Users className="w-6 h-6 text-purple-600" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Usuários Ativos</p>
            <p className="text-xl font-bold text-gray-900">{activeUsers}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bloco de Saldos por Ativo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-gray-500" /> Saldos Custodiados
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">BRL</span>
              <span className="font-bold text-gray-900">{formatBRL(totalBalances.BRL)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">BTC</span>
              <span className="font-bold text-gray-900">{formatCrypto(totalBalances.BTC)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">ETH</span>
              <span className="font-bold text-gray-900">{formatCrypto(totalBalances.ETH)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">USDT</span>
              <span className="font-bold text-gray-900">{formatCrypto(totalBalances.USDT)}</span>
            </div>
          </div>
        </div>

        {/* Lista de Últimas Movimentações */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Últimas Movimentações</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                  <th className="pb-3 font-medium">Tipo</th>
                  <th className="pb-3 font-medium">Ativo</th>
                  <th className="pb-3 font-medium">Valor</th>
                  <th className="pb-3 font-medium">Data</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {tx.type === 'DEPOSIT' ? 'Depósito' : 'Saque'}
                      </span>
                    </td>
                    <td className="py-3 font-medium text-gray-700">{tx.asset}</td>
                    <td className="py-3 font-bold text-gray-900">
                      {tx.asset === 'BRL' || tx.asset === 'USDT' 
                        ? formatBRL(tx.amount).replace('R$', tx.asset === 'USDT' ? '$' : 'R$') 
                        : formatCrypto(tx.amount)}
                    </td>
                    <td className="py-3 text-gray-500">
                      {new Date(tx.date).toLocaleDateString('pt-BR')} às {new Date(tx.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}