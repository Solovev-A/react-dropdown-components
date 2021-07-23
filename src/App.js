import React, { useState } from 'react';
import Multiselect from './components/multiselect';

const App = () => {
  const [selected, setSelected] = useState(['Опция 3']);

  return (
    <div style={{ width: '600px', margin: '1300px auto', height: '3000px' }}>
      <Multiselect
        value={selected}
        options={['Опция 1', 'Опция 2', 'Опция 3', 'Опция 4', 'Опция 5']}
        onChange={setSelected}
      />
    </div>
  );
}

export default App;
