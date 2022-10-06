import { useEffect, useRef, useState } from 'react';

export type Option = {
  value: string;
  label: string;
};

export const useQueryResults = (
  input: string,
  fetchFunction: (input: string) => Promise<Option[]>
) => {
  const [results, setResults] = useState<Option[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);
  const ref = useRef(0);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(timeout.current);
    if (!input) {
      setLoading(false);
      setSearch(input);
    } else {
      setLoading(true);
      timeout.current = setTimeout(() => {
        setSearch(input);
      }, 300);
    }
  }, [input]);

  useEffect(() => {
    ref.current += 1;
    const id = ref.current;

    const fetchData = async () => {
      if (search) {
        setLoading(true);
        const results = await fetchFunction(search);

        // avoiding race condition if an ealier request finishes later
        if (ref.current === id) {
          setResults(results);
          setLoading(false);
        }
      } else {
        setResults([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return { results, isLoading };
};
