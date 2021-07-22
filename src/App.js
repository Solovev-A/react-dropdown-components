import React from 'react';
import Multiselect from './components/multiselect';

const App = () => {
  return (
    <div style={{ width: '600px', margin: '1300px auto', height: '3000px' }}>
      <Multiselect
        selected={['Опция 2', 'Опция 3', 'Опция 5']}
        options={['Опция 1', 'Опция 2', 'Опция 3', 'Опция 4', 'Опция 5']}
        onSelectedChange={() => undefined}
      />
    </div>
  );
}

export default App;
