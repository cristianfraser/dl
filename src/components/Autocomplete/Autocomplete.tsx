import { Fragment, useRef, useState } from 'react';
import { useQueryResults } from '../../queries';

type AutocompleteProps = {
  value: Option;
  onSelect: (value: Option) => void;
  fetchFunction: (input: string) => Promise<Option[]>;
};

export type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  {
    value: '1',
    label: 'hello',
  },
  {
    value: '2',
    label: 'ciao',
  },
  {
    value: '3',
    label: 'hola',
  },
];

const Highlight = ({ text, match }: { text: string; match: string }) => {
  const lcText = text.toLocaleLowerCase();
  const lcMatch = match.toLocaleLowerCase();

  const lcArray = lcText.split(lcMatch);

  return (
    <span>
      {lcArray.map((element, index) => {
        if (!element && index === 0) {
          return null;
        }

        return (
          <Fragment key={index}>
            {index !== 0 && <b style={{ fontWeight: 600 }}>{match}</b>}
            {element}
          </Fragment>
        );
      })}
    </span>
  );
};

const Autocomplete = ({ onSelect, fetchFunction }: AutocompleteProps) => {
  const [input, setInput] = useState('');
  const [isFocus, setFocus] = useState(false);

  const { results, isLoading } = useQueryResults(input, fetchFunction);

  return (
    <div onFocusCapture={() => setFocus(true)}>
      <div style={isFocus ? { border: '1px solid red' } : undefined}>
        <input
          value={input}
          onChange={(event) => {
            const value = event.target.value;

            setInput(value);
          }}
        />
      </div>
      {isFocus && (
        <ul>
          {!isLoading &&
            results.map((option) => {
              return (
                <li key={option.value}>
                  <button
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
          {isLoading ? <li>Loading...</li> : null}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
