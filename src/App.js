import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    <div>
      <div className='registration w-50 mx-auto mt-4'>
        <h2 className='text-primary'>Please Register!</h2>

        <Form onSubmit={handleFromSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      </div>
    </div>
  );
}

export default App;
