import React from 'react';
import Multiselect from './components/multiselect';

const App = () => {
  return (
    <div style={{ width: '600px', margin: '20px auto' }}>
      <Multiselect selected={['sda', 'dadsa', 'asdsadasd']} />
    </div>
  );
}

export default App;
