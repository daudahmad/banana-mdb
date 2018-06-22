import React, { Component } from "react";
import { Row, Col, Alert } from "react-bootstrap";

function ErrorMessage({ message }) {
  return (
    <Row>
      <Col md={3} />
      <Col xs={12} md={6}>
        <Alert bsStyle="danger">{message}</Alert>
      </Col>
      <Col md={3} />
    </Row>
  );
}

export default ErrorMessage;
