
export type UserStatus = 'ACTIVE' | 'PENDING' | 'BLOCKED';
export type TransactionType = 'DEPOSIT' | 'WITHDRAW';
export type Asset = 'BRL' | 'BTC' | 'ETH' | 'USDT';

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  createdAt: string;
  lastActivity: string;
  balances: Record<Asset, number>;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  asset: Asset;
  amount: number;
  date: string;
  note?: string;
}


export const initialUsers: User[] = [
  { id: '1', name: 'Ana Silva', email: 'ana@email.com', status: 'ACTIVE', createdAt: '2024-01-10T10:00:00Z', lastActivity: '2024-03-10T14:30:00Z', balances: { BRL: 15000, BTC: 0.5, ETH: 2.1, USDT: 1000 } },
  { id: '2', name: 'Bruno Costa', email: 'bruno@email.com', status: 'PENDING', createdAt: '2024-02-15T09:00:00Z', lastActivity: '2024-02-15T09:00:00Z', balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } },
  { id: '3', name: 'Carlos Dias', email: 'carlos@email.com', status: 'BLOCKED', createdAt: '2023-11-05T11:20:00Z', lastActivity: '2024-01-20T08:15:00Z', balances: { BRL: 500, BTC: 0.01, ETH: 0, USDT: 50 } },
  { id: '4', name: 'Daniela Faria', email: 'daniela@email.com', status: 'ACTIVE', createdAt: '2024-03-01T16:45:00Z', lastActivity: '2024-03-10T09:10:00Z', balances: { BRL: 25000, BTC: 1.2, ETH: 5.5, USDT: 5000 } },
  { id: '5', name: 'Eduardo Gomes', email: 'eduardo@email.com', status: 'ACTIVE', createdAt: '2023-12-12T13:30:00Z', lastActivity: '2024-03-09T18:20:00Z', balances: { BRL: 3200, BTC: 0.1, ETH: 0.5, USDT: 300 } },
  { id: '6', name: 'Fernanda Lima', email: 'fernanda@email.com', status: 'ACTIVE', createdAt: '2024-01-25T14:10:00Z', lastActivity: '2024-03-08T11:05:00Z', balances: { BRL: 8900, BTC: 0.3, ETH: 1.2, USDT: 1500 } },
  { id: '7', name: 'Gabriel Martins', email: 'gabriel@email.com', status: 'PENDING', createdAt: '2024-03-05T10:00:00Z', lastActivity: '2024-03-05T10:00:00Z', balances: { BRL: 0, BTC: 0, ETH: 0, USDT: 0 } },
  { id: '8', name: 'Helena Neves', email: 'helena@email.com', status: 'ACTIVE', createdAt: '2023-10-20T08:50:00Z', lastActivity: '2024-03-09T22:40:00Z', balances: { BRL: 45000, BTC: 2.5, ETH: 10.0, USDT: 10000 } },
  { id: '9', name: 'Igor Oliveira', email: 'igor@email.com', status: 'BLOCKED', createdAt: '2024-02-01T15:15:00Z', lastActivity: '2024-02-28T16:30:00Z', balances: { BRL: 120, BTC: 0, ETH: 0.1, USDT: 0 } },
  { id: '10', name: 'Juliana Paes', email: 'juliana@email.com', status: 'ACTIVE', createdAt: '2024-02-20T12:00:00Z', lastActivity: '2024-03-10T10:20:00Z', balances: { BRL: 7600, BTC: 0.2, ETH: 0.8, USDT: 800 } },
];


const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const assets: Asset[] = ['BRL', 'BTC', 'ETH', 'USDT'];
  const types: TransactionType[] = ['DEPOSIT', 'WITHDRAW'];
  
  for (let i = 1; i <= 30; i++) {
    const randomUser = initialUsers[Math.floor(Math.random() * initialUsers.length)];
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const amount = randomAsset === 'BRL' || randomAsset === 'USDT' 
      ? Math.floor(Math.random() * 5000) + 100 
      : Number((Math.random() * 2).toFixed(4));

    transactions.push({
      id: `tx-${i.toString().padStart(3, '0')}`,
      userId: randomUser.id,
      type: randomType,
      asset: randomAsset,
      amount: amount,
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      note: `Mock ${randomType} de ${randomAsset}`,
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const initialTransactions: Transaction[] = generateTransactions();