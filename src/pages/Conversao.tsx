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
    setError(null);
    setResult(null);

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
      // Faz o fetch real na API do CoinGecko buscando tudo em BRL
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=brl'
      );

      if (!response.ok) {
        throw new Error('Falha ao buscar cotações. A API pode estar indisponível.');
      }

      const data = await response.json();

      // Mapeia os preços em BRL
      const pricesInBrl: Record<Asset, number> = {
        BRL: 1, // 1 Real é igual a 1 Real
        BTC: data.bitcoin.brl,
        ETH: data.ethereum.brl,
        USDT: data.tether.brl,
      };

      const fromPriceInBrl = pricesInBrl[fromAsset];
      const toPriceInBrl = pricesInBrl[toAsset];

      if (!fromPriceInBrl || !toPriceInBrl) {
        throw new Error('Cotação não encontrada para o ativo selecionado.');
      }

      // Matemática da conversão: Transforma para BRL, depois divide pela cotação do destino
      const valueInBrl = numericAmount * fromPriceInBrl;
      const convertedAmount = valueInBrl / toPriceInBrl;
      
      // Taxa de câmbio direta entre os dois ativos
      const exchangeRate = fromPriceInBrl / toPriceInBrl;

      setResult({
        amount: convertedAmount,
        rate: exchangeRate,
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao converter.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number, asset: Asset) => {
    if (asset === 'BRL') {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
    return `${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${asset}`;
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg"><RefreshCcw className="w-6 h-6 text-blue-600" /></div>
        <h1 className="text-2xl font-bold text-gray-800">Conversão de Ativos</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleConvert} className="space-y-6">
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Moeda de Origem */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">De (Origem)</label>
              <select
                value={fromAsset}
                onChange={(e) => setFromAsset(e.target.value as Asset)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                {assets.map(a => <option key={`from-${a.id}`} value={a.id}>{a.name}</option>)}
              </select>
            </div>

            <div className="hidden md:flex pt-6">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            {/* Moeda de Destino */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Para (Destino)</label>
              <select
                value={toAsset}
                onChange={(e) => setToAsset(e.target.value as Asset)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                {assets.map(a => <option key={`to-${a.id}`} value={a.id}>{a.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor a converter</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                {fromAsset}
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}

          {result && !error && (
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl space-y-2">
              <p className="text-sm text-blue-600 font-medium uppercase tracking-wider">Resultado da Conversão</p>
              <p className="text-3xl font-bold text-blue-900">
                {formatCurrency(result.amount, toAsset)}
              </p>
              <p className="text-sm text-blue-700 mt-2">
                Taxa utilizada: 1 {fromAsset} = {formatCurrency(result.rate, toAsset)}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Buscando cotação...
              </>
            ) : (
              'Converter Agora'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}