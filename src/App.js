import React from 'react';
import Multiselect from './components/multiselect';

const App = () => {
  return (
    <div style={{ width: '600px', margin: '1300px auto', height: '3000px' }}>
      <Multiselect selected={['sda', 'dadsa', 'asdsadasd']} />
    </div>
  );
}

export default App;
