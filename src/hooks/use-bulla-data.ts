import { useState, useEffect } from 'react';

const ENDPOINT = "https://api.goldsky.com/api/public/project_clxvwihx9eci401ud1suddgpf/subgraphs/bulla-contracts-base/v2-main/gn";

const QUERY = `
  query GetBullaData {
    claims(first: 50, orderBy: lastUpdatedTimestamp, orderDirection: desc) {
      id
      amount
      description
      debtor
      creditor
      token
      lastUpdatedTimestamp
    }
    instantPaymentEvents(first: 50, orderBy: timestamp, orderDirection: desc) {
      id
      amount
      description
      from
      to
      token
      timestamp
    }
  }
`;

export interface BullaItem {
  id: string;
  type: 'claim' | 'payment';
  amount: string;
  description: string;
  from: string;
  to: string;
  token: string;
  timestamp: number;
}

export function useBullaData() {
  const [data, setData] = useState<BullaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: QUERY }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        const claims = result.data.claims.map((item: any) => ({
          id: item.id,
          type: 'claim',
          amount: item.amount,
          description: item.description,
          from: item.debtor,
          to: item.creditor,
          token: item.token,
          timestamp: Number(item.lastUpdatedTimestamp),
        }));

        const payments = result.data.instantPaymentEvents.map((item: any) => ({
          id: item.id,
          type: 'payment',
          amount: item.amount,
          description: item.description,
          from: item.from,
          to: item.to,
          token: item.token,
          timestamp: Number(item.timestamp),
        }));

        const combined = [...claims, ...payments].sort((a, b) => {
          return b.timestamp - a.timestamp;
        });

        setData(combined);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch Bulla data", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}