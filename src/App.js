import React, { useEffect, useState } from 'react';
import Autocomplete from './components/autocomplete';
import Multiselect from './components/multiselect';
import { filterOptions } from './utils';

const options = [
  'Алексей Петров',
  'Александр Петров',
  'Александр Иванов',
  'Иван Петров',
  'Александр Сидоров',
  'Александр Алексеев',
  'Иван Александров',
  'Константин Антонов',
  'Константин Сергеев',
  'Сергей Ильин',
  'Василий Ильин'
]

const autocompleteThreshold = 3;

const App = () => {
  const [selected, setSelected] = useState(['Иван Петров']);

  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [autocompleteSearch, setAutocompleteSearch] = useState(null);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);

  useEffect(() => {
    if (autocompleteSearch === null) return;
    if (autocompleteSearch.length <= autocompleteThreshold) return;

    setAutocompleteLoading(true);
    // здесь может быть обращение к api
    const timer = setTimeout(() => {
      console.log('API CALL')
      const newOptions = filterOptions(options, autocompleteSearch);
      setAutocompleteOptions(newOptions);
      setAutocompleteLoading(false);
    }, 500)

    return () => clearTimeout(timer);
  }, [autocompleteSearch])


  return (
    <div style={{ width: '600px', margin: '1300px auto', height: '3000px' }}>
      <div style={{ margin: '0 0 100px 0' }}>
        <Multiselect
          value={selected}
          options={options}
          onChange={setSelected}
        />
      </div>
      <div style={{ margin: '0 0 100px 0' }}>
        <Autocomplete
          options={autocompleteOptions}
          value={autocompleteValue}
          onChange={setAutocompleteValue}
          onSearchChange={setAutocompleteSearch}
          isLoading={autocompleteLoading}
          threshold={autocompleteThreshold}
        />
      </div>
    </div>
  );
}

export default App;
