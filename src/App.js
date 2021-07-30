import React, { useEffect, useState } from 'react';

import { Autocomplete, Multiselect } from './lib/components';
import { filterOptions } from './lib/utils';
import { selectedOption, options } from './mockData'


const autocompleteThreshold = 3;

const App = () => {
  const [selected, setSelected] = useState([selectedOption]);

  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [autocompleteSearch, setAutocompleteSearch] = useState(null);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);

  const getSearchValue = (option) => option.name;
  const getOptionKey = (option) => option.id;
  const renderOptionText = (option) => {
    return (
      <span>
        <b>{option.name}</b> <br />
        {option.email}
      </span>
    )
  };
  const renderValueText = (option) => option.name;

  useEffect(() => {
    if (autocompleteSearch === null) return;
    if (autocompleteSearch.length <= autocompleteThreshold) return;

    setAutocompleteLoading(true);
    // здесь может быть обращение к api
    const timer = setTimeout(() => {
      const newOptions = filterOptions(options, autocompleteSearch, getSearchValue);
      setAutocompleteOptions(newOptions);
      setAutocompleteLoading(false);
    }, 500)

    return () => clearTimeout(timer);
  }, [autocompleteSearch])


  return (
    <div style={{ width: '600px', margin: '50px auto' }}>
      <h1>React dropdown components</h1>
      <div>
        <h2>Multiselect</h2>
        <Multiselect
          value={selected}
          options={options}
          onChange={setSelected}
          getOptionKey={getOptionKey}
          renderOptionText={renderOptionText}
          renderValueText={renderValueText}
          getSearchValue={getSearchValue}
          placeholder='Type to search'
        />
      </div>
      <div>
        <h2>Autocomplete</h2>
        <Autocomplete
          options={autocompleteOptions}
          value={autocompleteValue}
          onChange={setAutocompleteValue}
          onSearchChange={setAutocompleteSearch}
          isLoading={autocompleteLoading}
          threshold={autocompleteThreshold}
          getOptionKey={getOptionKey}
          renderOptionText={renderOptionText}
          placeholder='Type "fish"'
        />
      </div>
    </div>
  );
}

export default App;
