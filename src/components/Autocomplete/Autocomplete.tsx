import { useCallback, useEffect, useRef, useState } from 'react';
import Highlight from './Highlight';

import { useQueryResults } from './queries';

import './Autocomplete.css';

export type AutocompleteProps = {
  onSelect: (value: Option) => void;
  id: string;
  fetchFunction: (input: string) => Promise<Option[]>;
};

export type Option = {
  value: string;
  label: string;
};

const Autocomplete = ({ onSelect, fetchFunction, id }: AutocompleteProps) => {
  const [input, setInput] = useState('');
  const [isFocus, setFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { results, isLoading } = useQueryResults(input, fetchFunction);

  const onOutsideClickHandler = useCallback(() => {
    setFocus(false);
  }, [setFocus]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      onOutsideClickHandler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, onOutsideClickHandler]);

  return (
    <div onFocusCapture={() => setFocus(true)} ref={ref}>
      <div>
        <input
          className="input"
          id={id}
          value={input}
          onChange={(event) => {
            const value = event.target.value;
            setInput(value);
          }}
        />
      </div>
      {isFocus && input.length > 0 && (
        <div className="results-container">
          <ul className="results-list">
            {!isLoading &&
              results.map((option) => {
                return (
                  <li className="result-li" key={option.value}>
                    <button
                      className="result-button"
                      onClick={() => {
                        setInput(option.label);
                        onSelect(option);
                        setFocus(false);
                      }}
                    >
                      <Highlight text={option.label} match={input} />
                    </button>
                  </li>
                );
              })}
            {!isLoading &&
            results &&
            results.length === 0 &&
            input.length > 0 ? (
              <li className="result-placeholder-li">No results.</li>
            ) : null}
            {isLoading ? (
              <li className="result-placeholder-li">Loading...</li>
            ) : null}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
