import { useState } from 'react';
import { initialUsers, initialTransactions, type Asset } from '../mocks/data';
import { ArrowDownCircle, CheckCircle } from 'lucide-react';

export default function Deposito() {
  const [userId, setUserId] = useState('');
  const [asset, setAsset] = useState<Asset>('BRL');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const numericAmount = parseFloat(amount.replace(',', '.'));

    if (!userId || !amount || numericAmount <= 0 || isNaN(numericAmount)) {
      setStatusMessage({ type: 'error', text: 'Preencha todos os campos obrigatórios com valores válidos.' });
      return;
    }

    const user = initialUsers.find(u => u.id === userId);
    if (!user) {
      setStatusMessage({ type: 'error', text: 'Usuário não encontrado.' });
      return;
    }

    user.balances[asset] += numericAmount;

    initialTransactions.unshift({
      id: `tx-dep-${Date.now()}`,
      userId: user.id,
      type: 'DEPOSIT',
      asset: asset,
      amount: numericAmount,
      date: new Date().toISOString(),
      note: note || undefined,
    });

    setStatusMessage({ type: 'success', text: 'Depósito realizado com sucesso!' });
    setAmount('');
    setNote('');
    setUserId('');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-2 rounded-lg"><ArrowDownCircle className="w-6 h-6 text-green-600" /></div>
        <h1 className="text-2xl font-bold text-gray-800">Novo Depósito</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuário *</label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Selecione um usuário...</option>
              {initialUsers.filter(u => u.status !== 'BLOCKED').map(user => (
                <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ativo *</label>
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value as Asset)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="BRL">BRL (Real)</option>
                <option value="BTC">BTC (Bitcoin)</option>
                <option value="ETH">ETH (Ethereum)</option>
                <option value="USDT">USDT (Tether)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor *</label>
              <input
                type="number"
                step="any"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observação (Opcional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              rows={3}
              placeholder="Adicione uma nota sobre este depósito..."
            />
          </div>

          {statusMessage && (
            <div className={`p-4 rounded-lg flex items-center gap-2 ${statusMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {statusMessage.type === 'success' && <CheckCircle className="w-5 h-5" />}
              <span className="font-medium">{statusMessage.text}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Confirmar Depósito
          </button>
        </form>
      </div>
    </div>
  );
}