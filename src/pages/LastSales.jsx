import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage() {
  const [sales, setSales] = useState();
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(process.env.NEXT_PUBLIC_FIREBASE, fetcher);

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          userName: data[key].userName,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data])

  if (error) {
    return <p>No data yet!!!</p>;
  }

  if (!sales || !data) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.userName} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
