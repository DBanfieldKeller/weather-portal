import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function LogoutAlert(props) {

    // close alert on close button click
    const closeAlert = () => props.handleAlertClose()

    if(props.showAlert){
    return (
      <Alert variant="danger" onClose={closeAlert} dismissible>
        <Alert.Heading>Session Expired!</Alert.Heading>
        <p>
          Your current session has expired.  Please login again if you would like to save your search history.
        </p>
      </Alert>
    );
  }};