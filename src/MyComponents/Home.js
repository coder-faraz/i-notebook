
import React from "react";
import { Container } from "react-bootstrap";
import Notes from "./Notes";



export default function Home(props) {

    return (
        <Container>
            <Notes mode={ props.useMode } />
        </Container>
    );
}




