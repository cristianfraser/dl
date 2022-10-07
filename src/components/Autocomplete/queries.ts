import { useEffect, useRef, useState } from 'react';

export type Option = {
  value: string;
  label: string;
};

export const useQueryResults = (
  input: string,
  fetchFunction: (input: string) => Promise<Option[]>
) => {
  const [results, setResults] = useState<{ [input: string]: Option[] }>({});
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(true);
  const ref = useRef(0);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(timeout.current);
    if (!input) {
      // setLoading(false);
      setSearch(input);
    } else {
      setLoading(true);
      timeout.current = setTimeout(() => {
        if (results[input]) {
          setLoading(false);
        }
        setSearch(input);
      }, 300);
    }
  }, [input, results]);

  useEffect(() => {
    ref.current += 1;
    const id = ref.current;

    const fetchData = async () => {
      if (search) {
        if (results[input]) {
          setLoading(false);
          return;
        }

        const response = await fetchFunction(search);

        // avoiding race condition if an ealier request finishes later
        if (ref.current === id) {
          setResults((prevResults) => ({
            ...prevResults,
            [input]: response,
          }));
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [search, fetchFunction, input, results]);

  return { results: results[input], isLoading: isLoading || !results[input] };
};
