import { useState } from 'react';

import './App.css';

import ExampleAutocomplete from './components/ExampleAutocomplete/ExampleAutocomplete';

function App() {
  const [value, setValue] = useState('');

  return (
    <div className="App">
      <main className="main">
        <div className="content">
          <h1 className="title">Rick and Morty episodes</h1>
          <div className="input-container">
            <label htmlFor="example-autocomplete">Example autocomplete</label>
            <ExampleAutocomplete
              id="example-autocomplete"
              onSelect={(option) => {
                setValue(option.label);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="selected">Selected value</label>
            <div>
              <input
                id="selected"
                value={value}
                disabled
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
