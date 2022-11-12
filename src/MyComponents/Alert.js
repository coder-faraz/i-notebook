
import React from 'react';
import { Container } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';



export default function AlertComponent(props) {

    return (

      <Container style={{height: "56px"}}>
      { props.alerting && <Alert variant="success" style={{ margin: "0 -122px 4px -122px"}} >
          Success
        </Alert> }
      </Container>
    );
}




