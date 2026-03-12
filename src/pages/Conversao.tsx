import { useState } from 'react';
import { RefreshCcw, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

type Asset = 'BRL' | 'BTC' | 'ETH' | 'USDT';

export default function Conversao() {
  const [fromAsset, setFromAsset] = useState<Asset>('BRL');
  const [toAsset, setToAsset] = useState<Asset>('BTC');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ amount: number; rate: number } | null>(null);

  const assets: { id: Asset; name: string; cryptoId: string }[] = [
    { id: 'BRL', name: 'BRL (Real)', cryptoId: 'brl' },
    { id: 'BTC', name: 'BTC (Bitcoin)', cryptoId: 'bitcoin' },
    { id: 'ETH', name: 'ETH (Ethereum)', cryptoId: 'ethereum' },
    { id: 'USDT', name: 'USDT (Tether)', cryptoId: 'tether' },
  ];

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setResult(null);
    const numericAmount = parseFloat(amount.replace(',', '.'));
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Por favor, insira um valor válido maior que zero.');
      return;
    }
    if (fromAsset === toAsset) {
      setResult({ amount: numericAmount, rate: 1 });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=brl');
      if (!response.ok) throw new Error('Falha ao buscar cotações. A API pode estar indisponível.');
      const data = await response.json();
      const pricesInBrl: Record<Asset, number> = { BRL: 1, BTC: data.bitcoin.brl, ETH: data.ethereum.brl, USDT: data.tether.brl };
      const fromPriceInBrl = pricesInBrl[fromAsset];
      const toPriceInBrl = pricesInBrl[toAsset];
      if (!fromPriceInBrl || !toPriceInBrl) throw new Error('Cotação não encontrada para o ativo selecionado.');
      
      const valueInBrl = numericAmount * fromPriceInBrl;
      const convertedAmount = valueInBrl / toPriceInBrl;
      const exchangeRate = fromPriceInBrl / toPriceInBrl;

      setResult({ amount: convertedAmount, rate: exchangeRate });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao converter.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number, asset: Asset) => {
    if (asset === 'BRL') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    return `${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${asset}`;
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg"><RefreshCcw className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Conversão de Ativos</h1>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
        <form onSubmit={handleConvert} className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">De (Origem)</label>
              <select value={fromAsset} onChange={(e) => setFromAsset(e.target.value as Asset)} className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors">
                {assets.map(a => <option key={`from-${a.id}`} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div className="hidden md:flex pt-6"><ArrowRight className="w-6 h-6 text-gray-400 dark:text-slate-500" /></div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Para (Destino)</label>
              <select value={toAsset} onChange={(e) => setToAsset(e.target.value as Asset)} className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors">
                {assets.map(a => <option key={`to-${a.id}`} value={a.id}>{a.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Valor a converter</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400 font-medium">{fromAsset}</span>
              <input type="number" step="any" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full pl-16 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg transition-colors" />
            </div>
          </div>
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}
          {result && !error && (
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl space-y-2 transition-colors">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider">Resultado da Conversão</p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{formatCurrency(result.amount, toAsset)}</p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">Taxa: 1 {fromAsset} = {formatCurrency(result.rate, toAsset)}</p>
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Buscando cotação...</> : 'Converter Agora'}
          </button>
        </form>
      </div>
    </div>
  );
}