
import React, { useContext, useState } from "react";
import NoteContext from "../MyContexts/NoteContext";
import AlertComponent from "./Alert";

import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




const AddNote = (props) => {

    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: '', description: '', tag: 'default'});


    const changeHandler = (e) => {
        setNote({...note, [e.target.name]: e.target.value });
    }


    const [alert, setAlert] = useState('');   //initial value of alert is null

    let showAlert = () => {
        setAlert(true);         //showAlert(type) will create setAlert() & set the corresponding value
  
        setTimeout(() => {
            setAlert(false);     //automatically hide alert message after 1.5s after setting setAlert() to null
        }, 2000);
    }
  

    const clickHandler = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        document.querySelector("#noteForm").reset();    //to clear input fields when a note is added
        setNote({title: '', description: '', tag: ''});     //to clear note object from memory, otherwise
                                                           //code will malfunction
        showAlert();
    }
console.log(props.mode)

    return (

        <>
        <AlertComponent alerting={ alert }/>

        <Container>
        <h2 className="my-2">
            Add a Note
        </h2>

        <Form id="noteForm">
        <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title Cannot Be Blank" name="title" onChange={ changeHandler } />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Describe Your Note" name="description" onChange={ changeHandler } />
        </Form.Group>
        <Button variant={ props.mode==='light'? 'primary': 'secondary' } type="submit" disabled={ note.title.length < 5 || note.description.length < 5 } onClick={ clickHandler }>
            Add Note
        </Button>
        </Form>

      </Container>
      </>

    );
}



export default AddNote;
