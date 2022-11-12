import React from "react";
import PropTypes from "prop-types";

// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";      //to add CSS Styling of bootstrap components
import Form from 'react-bootstrap/Form';
import { LinkContainer } from "react-router-bootstrap";



function NavigationBar(props) {

    return (

      <Navbar bg={`${props.useMode==='light'? 'light':'dark'}`} variant={`${props.useMode==='light'? 'light':'dark'}`} expand="lg">
        <Navbar.Brand style={ {paddingLeft: '22px',} }>{ props.title }</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link> Home </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link> About </Nav.Link>
            </LinkContainer>
          </Nav>
          <Form>
            <Form.Check type="switch" label={`Enable ${ props.useMode==='light'?'dark'.charAt(0).toUpperCase() + 'dark'.slice(1):'light'.charAt(0).toUpperCase() + 'light'.slice(1)} Mode`} onClick={ props.toggleMode } style={ { paddingRight: '16px', color: `${ props.useMode==='light'? 'black':'white'}` } } />
          </Form>
        </Navbar.Collapse>
      </Navbar>

    );
}


NavigationBar.propTypes = {
    title: PropTypes.string,
    useMode: PropTypes.string
}



export default NavigationBar;

