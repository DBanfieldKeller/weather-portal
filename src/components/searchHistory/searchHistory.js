import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

export default function SearchHistory(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // TODO: make list buttons into map function
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
                        <ListGroup.Item action>
                            This one is a button
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            This one is a button
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            This one is a button
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            This one is a button
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            This one is a button
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}