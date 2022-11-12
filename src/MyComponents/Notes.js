
import React, { useContext, useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import NoteContext from "../MyContexts/NoteContext";
import AddNote from "./AddNote";
import Notecard from "./Notecard";



const Notes = (props) => {

    const context = useContext(NoteContext);
    const {notes, getAllNotes, editNote } = context;
    const ref = useRef(null);

    useEffect(() => {
      getAllNotes();
      // eslint-disable-next-line
    }, [])


    const [note, setNote] = useState({utitle: '', udescription: '', utag: ''});

    const updateNote = (currentNote) => {
      ref.current.click();
      setNote({id: currentNote._id, utitle: currentNote.title, udescription: currentNote.description});
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const changeHandler = (e) => {
      setNote({...note, [e.target.name]: e.target.value });
  }

  const clickHandler = () => {
    editNote(note.id, note.utitle, note.udescription, note.utag);
    setShow(false);
  }
console.log(props.mode)

    return (
      <>
      <AddNote mode={ props.mode } />

      <Button ref={ ref } variant="primary" className="d-none" onClick={ handleShow }> Launch </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
        <Form.Group className="mb-3" controlId="utitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title Cannot Be Blank" name="utitle" value={ note.utitle } onChange={ changeHandler } />
        </Form.Group>

        <Form.Group className="mb-3" controlId="udescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Describe Your Note" name="udescription" value={ note.udescription } onChange={ changeHandler } />
        </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={ clickHandler }> Update Note </Button>
        </Modal.Footer>
      </Modal>

      <Container className="row">
        <h3 className="my-3"> Your Notes </h3>
        {notes.map(note => <Notecard  mode={ props.mode } key={ note._id } newNote={ note } updateNote={ updateNote }/>
        )}
      </Container>
      </>
    );
}



export default Notes;

