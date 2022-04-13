import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleNameBlur = e => { //event
    setName(e.target.value);
  }


  const handleEmailBlur = e => { //event
    setEmail(e.target.value);
  }

  const handlePasswordBlur = e => {
    setPassword(e.target.value);
  }

  const handleRegisteredChange = e => {
    setRegistered(e.target.checked);
  }

  const handleFromSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {

      e.stopPropagation();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password should contain at least one special character');
      return;
    }

    setValidated(true);
    setError('');

    if (registered) {
      console.log(email, password);
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');

          verifyEmail();

          setUserName();
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }
    e.preventDefault();
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email sent');
      })
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('updating name');
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email Verification Sent');
      })
  }

  return (
    <div className='container'>
      <div className='registration w-50 mx-auto mt-4'>
        <h2 className='text-primary'>Please {registered ? 'Login' : 'Register'}!</h2>

        <Form noValidate validated={validated} onSubmit={handleFromSubmit}>

          {!registered && <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide a your Name.
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered!" />
          </Form.Group>

          <p className='text-danger'>{error}</p>

          <Button onClick={handlePasswordReset} variant="link">Forget Password?</Button>

          <br />

          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>

        </Form>

      </div>

    </div>
  );
}

export default App;