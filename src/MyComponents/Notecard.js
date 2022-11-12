
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import React, { useContext } from 'react';
import NoteContext from '../MyContexts/NoteContext';



function Notecard(props) {

  const context = useContext(NoteContext);
  const { deleteNote } = context;


    return (

    <Container className='col-md-3 mx-4 my-3'>
          <Card style={{ width: '18rem', backgroundColor: props.mode==='dark' ? "hsl(0, 0%, 12%)" : "", color: props.mode==='dark' ? 'white' : "" }}>
          <Card.Body>
            <Card.Title> {props.newNote.title } &nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fa-regular fa-pen-to-square mx-2" title="Edit" onClick={ () => { props.updateNote(props.newNote) } }></i> <i className="fa-solid fa-trash mx-2" title="Delete" onClick={ () => { deleteNote(props.newNote._id) } }></i> </Card.Title>
            <Card.Text> { props.newNote.description } </Card.Text>
          </Card.Body>
          </Card>
    </Container>
  );
}


export default Notecard;

