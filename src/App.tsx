import React, { useState } from 'react';

import './App.css';
import Autocomplete, { Option } from './components/Autocomplete/Autocomplete';

const options: Option[] = [
  {
    value: 'z',
    label: 'holaHolah',
  },
  {
    value: 'x',
    label: 'chaoChao',
  },
  {
    value: 'v',
    label: 'ciaoCiao',
  },
  {
    value: 'q',
    label: 'helloHello',
  },
  {
    value: 'c',
    label: 'halloHallo',
  },
  {
    value: 's',
    label: 'hiHi',
  },
  {
    value: 'a',
    label: 'haHa',
  },
];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [value, setValue] = useState<Option>({
    label: '',
    value: '',
  });

  return (
    <div className="App">
      <header className="App-header"></header>

      <main>
        <div>
          <Autocomplete
            onSelect={(option) => {
              setValue(option);
            }}
            value={value}
            fetchFunction={(input) => {
              return new Promise((resolve) => {
                console.log(input);
                setTimeout(() => {
                  const res = options.filter((option) =>
                    option.label.includes(input)
                  );
                  resolve(res);
                }, getRandomInt(1, 4) * 900);
              });
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
