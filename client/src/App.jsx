import React, {useSelector} from 'react-redux';
import './App.css';
import Login from "./components/login/Login";
import Main from "./components/Main";


function App() {
    const userLogin = useSelector(state => state.user.login)
  // useEffect(() => {
  //   // TEST API, it might be removed
  //   fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
  //     console.log('API CONNECTION IS OK');
  //   }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
  // }, []);


  return (
    <div className="App">
        {!userLogin && <Login/>}
        {userLogin && <Main/>}
    </div>
  );
}

export default App;
