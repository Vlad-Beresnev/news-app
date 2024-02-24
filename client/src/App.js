import React from 'react';
import logo from './logo.svg';
import './App.css';
import News from './components/news';

function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <News />
    </div>
  );
}

export default App;
