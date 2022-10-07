import { useState } from 'react';

import './App.css';
import { Option } from './components/Autocomplete/Autocomplete';
import ExampleAutocomplete from './components/ExampleAutocomplete/ExampleAutocomplete';

function App() {
  const [value, setValue] = useState<Option>({
    label: '',
    value: '',
  });

  return (
    <div className="App">
      <header className="App-header"></header>

      <main className="main">
        <div className="content">
          <div className="input-container">
            <label htmlFor="example-autocomplete">Example autocomplete</label>
            <ExampleAutocomplete
              id="example-autocomplete"
              onSelect={(option) => {
                setValue(option);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="selected">Selected value</label>
            <div>
              <input
                id="selected"
                value={value.label}
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
