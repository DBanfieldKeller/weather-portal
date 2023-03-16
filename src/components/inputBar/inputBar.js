import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./style.css";

export default function InputBar(props) {
    return (
        <Form>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            City Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control 
            type="input" 
            placeholder="City, State or City, Country" 
            value={props.value}
            onChange={props.handleInputChange} />
          </Col>
        </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
              Units
            </Form.Label>
              <Form.Check
                type="radio"
                label="Imperial"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="Metric"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Bleat Your Weather</Button>
        </Col>
      </Form.Group>
      </Form>
    )
}