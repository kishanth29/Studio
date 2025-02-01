import React, { useState } from 'react';
import { Container, Tabs, Tab, Button, Form } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';
import Appbar from '../components/Appbar'
import Footer from '../components/Footer';

function Membership() {
  const [key, setKey] = useState('login');

  const handleTabSelect = (k) => {
    setKey(k);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Replace with actual login logic (e.g., API call, authentication)
    console.log('Login form submitted!');
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    // Replace with actual sign-up logic (e.g., API call, user creation)
    console.log('Sign-up form submitted!');
  };

  return (
    <>
        <Appbar/>
        <Container className="p-3 my-5 d-flex flex-column w-50">

<Tabs activeKey={key} onSelect={handleTabSelect} justify className='mb-3'>
  <Tab eventKey="login" title="Login">
    <div className="text-center mb-3">
      <p>Sign in with:</p>

      <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
        <Button variant="light" className='m-1' style={{ color: '#007bff' }}>
          <FaFacebookF size="sm" />
        </Button>

        <Button variant="light" className='m-1' style={{ color: '#007bff' }}>
          <FaTwitter size="sm" />
        </Button>

        <Button variant="light" className='m-1' style={{ color: '#007bff' }}>
          <FaGoogle size="sm" />
        </Button>

        <Button variant="light" className='m-1' style={{ color: '#007bff' }}>
          <FaGithub size="sm" />
        </Button>
      </div>

      <p className="text-center mt-3">or:</p>
    </div>

    <Form onSubmit={handleLoginSubmit} className="mb-4">
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Sign in
      </Button>
    </Form>

    <p className="text-center">Not a member? <Button variant="link" onClick={() => setKey('register')}>Register</Button></p>
  </Tab>

  <Tab eventKey="register" title="Register">
    <div className="text-center mb-3">
      <p>Sign up with:</p>

      <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
        <Button variant="light" className='m-1' style={{ color: '#007bff' }}>
          <FaFacebookF size="sm" />
        </Button>

        <Button variant="light" className='m-1' style={{ color: '#007bff' }}>
          <FaTwitter size="sm" />
        </Button>

        <Button variant="light" className='m-1' style={{ color: '#007bff' }}>
          <FaGoogle size="sm" />
        </Button>

        <Button variant="light" className='m-1' style={{ color: '#007bff' }}>
          <FaGithub size="sm" />
        </Button>
      </div>

      <p className="text-center mt-3">or:</p>
    </div>

    <Form onSubmit={handleSignupSubmit} className="mb-4">
      <Form.Group className="mb-4" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
      </Form.Group>

      

      <Form.Group className="mb-4" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I have read and agree to the terms" />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100" onClick={() => setKey('lo')}>
        Sign up
      </Button>
    </Form>
  </Tab>
</Tabs>

        </Container>
        <Footer/>
    
    </>
    
  );
}

export default Membership;
