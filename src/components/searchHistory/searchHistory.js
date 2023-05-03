import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

export default function SearchHistory(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (e) => {
        e.preventDefault()
        props.handleInputChange(e);
        props.weatherLookup(e.target.value, props.units);
        handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                View Your Recent Cities
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Recent Cities</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {props.searchHistory.map(city =>
                            <ListGroup.Item 
                            action
                            onClick={handleClick}
                            value={city}>
                                {city}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}