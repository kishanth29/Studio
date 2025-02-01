import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Cart = () => {
    const [show, setShow] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setShow(!show)} className="me-2">
        
      </Button>
      <Offcanvas show={show} onHide={() => setShow(!show)} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Cart




