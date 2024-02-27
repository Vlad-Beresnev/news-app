import React from 'react';
import logo from './logo.svg';
import './App.css';
import News from './components/news';

function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    
  }, []);

  return (
    <div className="App">
      <News />
    </div>
  );
}

export default App;
