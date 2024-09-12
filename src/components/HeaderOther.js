import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HeaderOther.css'; 

const HeaderOther = () => {
  return (
    <Navbar className="headerOuter"> 
      <Navbar.Brand as={Link} to="/">Controle Fácil</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/nova-despesa">Nova Despesa</Nav.Link>
          <Nav.Link as={Link} to="/despesas">Despesas</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderOther;
