import { useState } from 'react';

/**
 *  If your component has multiple calls, call this hook multiple times.
 */

export type UseRequest<T = object> = {
  get: (endpoint: string) => Promise<T>;
  data: T | null;
  isLoading: boolean;
};

export const useRequest = <T>(): UseRequest<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null); // add generics later please!

  const get = async (endpoint: string): Promise<T> => {
    setIsLoading(true);
    const data = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async res => {
        setIsLoading(false);
        return await res.json();
      })
      .catch(e => {
        setIsLoading(false);
        console.error(e);
      });
    setData(data);
    return data;
  };

  return { get, data, isLoading };
};
