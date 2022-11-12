
import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial)

    const host = 'http://localhost:5000';


    //Fetch All the Notes from the Mongodb Database
    const getAllNotes = async () => {

        const response = await fetch(`${host}/api/notes/allnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    //Create a new note & add it to the database
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/createnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, tag})     //body data must match Content-Type Header
        });

        const json = await response.json();
        setNotes(notes.concat(json));    //concat() returns an array whereas push() updates an array

        console.log(json);
    }


    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        // window.location.reload();


        let deleted = notes.filter(note => note._id !== id);
        setNotes(deleted);
    }


    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, tag})     //body data must match Content-Type Header
        });
        const json = await response.json();
        console.log(json);
        getAllNotes();

        for(let i=0; i<notes.length; i++) {
            const elem = notes[i];
            if(elem._id === id) {
                elem.title = title;
                elem.description = description;
                elem.tag = tag;
            }
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}


export default NoteState;
