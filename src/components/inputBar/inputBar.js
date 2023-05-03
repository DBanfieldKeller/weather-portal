import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./style.css";
import SearchHistory from "../searchHistory/searchHistory";

export default function InputBar(props) {
  return (
    <Form id="input-body">
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <p>City Name</p>
        <Col sm={{ span: 2, offset: 5 }}>
          <Form.Control
            type="input"
            placeholder="City Name"
            value={props.currentLocation}
            onChange={props.handleInputChange} />
        </Col>
      </Form.Group>
      <p>Units</p>
      <Form.Check
        type="radio"
        inline="true"
        label="Imperial"
        name="unitSelect"
        id="formHorizontalRadios1"
        value={"imperial"}
        checked={props.units === "imperial"}
        onChange={props.handleUnitChange}
      />
      <Form.Check
        type="radio"
        inline="true"
        label="Metric"
        name="unitSelect"
        id="formHorizontalRadios2"
        value={"metric"}
        checked={props.units === "metric"}
        onChange={props.handleUnitChange}
      />
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 1 }} id="submit-button-container">
          <Button
            type="submit"
            onClick={props.handleFormSubmit}>
            Bleat Your Weather</Button>
          {props.isLoggedIn ? 
          <SearchHistory 
          searchHistory={props.searchHistory}
          handleFormSubmit={props.handleFormSubmit}
          handleInputChange={props.handleInputChange}
          currentLocation={props.currentLocation} 
          weatherLookup={props.weatherLookup}
          units={props.units}/> : ""}
        </Col>
      </Form.Group>
    </Form>
  )
}