import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function LogoutAlert() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Session Expired!</Alert.Heading>
        <p>
          Your current session has expired.  Please login again if you would like to save your search history.
        </p>
      </Alert>
    );
  }
  return
};