import React, { Component } from "react";
import styled from "styled-components";
import { Image, Row, Col, Panel } from "react-bootstrap";

function MoviePanel({ movie }) {
  return (
    <Row>
      <Col md={3} />
      <Col xs={12} md={6}>
        <Panel>
          <Panel.Heading>
            {movie.title} ({movie.year})
          </Panel.Heading>
          <Panel.Body>
            <Image src={movie.poster} rounded />
          </Panel.Body>
        </Panel>
      </Col>
      <Col md={3} />
    </Row>
  );
}

export default MoviePanel;
