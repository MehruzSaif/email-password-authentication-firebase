import logo from './logo.svg';
import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app);

function App() {
  const handleEmailBlur = e => {
    console.log(e.target.value);
  }

  const handlePasswordChange = e => {
    console.log(e.target.value);
  }
  return (
    <div className="App">
      <form>
        <input onBlur={handleEmailBlur} type="email" name='' id=''/>
        <br/>
        <input onChange={handlePasswordChange} type="password" name='' id='' />
      </form>
    </div>
  );
}

export default App;
