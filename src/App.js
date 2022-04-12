import logo from './logo.svg';
import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app);

function App() {
  const handleEmailBlur = e => { //event
    console.log(e.target.value);
  }

  const handlePasswordBlur = e => {
    console.log(e.target.value);
  }

  const handleFromSubmit = e => {
    console.log('form submitted');
    e.preventDefault();
  }

  return (
    <div className="App">
      <form onSubmit={handleFromSubmit}>
        <input onBlur={handleEmailBlur} type="email" name='' id='1'/>
        <br/>
        <input onBlur={handlePasswordBlur} type="password" name='' id='2' />
        <br/>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default App;
