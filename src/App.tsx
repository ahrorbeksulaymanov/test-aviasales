import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import MainPage from './components/main/main';

function App() {

  // const [id, setId] = useState(undefined);

  // useEffect(() => {
  //   axios
  //     .get("https://front-test.beta.aviasales.ru/search")
  //     .then((res) => setId(res?.data?.searchId));
  //   }, []);


  return (
    <div className="App">
      <MainPage/>
    </div>
  );
}

export default App;
