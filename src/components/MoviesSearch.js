import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Row, Col } from "react-bootstrap";

const Heading = styled.h1`
  font-size: 2em;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  border: none;
  border-radius: 3px;
  background: lightyellow;
  width: 300px;
`;

const Button = styled.button`
  background: lightyellow;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkgray;
  border-radius: 3px;
`;

function MoviesSearch({ selectedTitle, isFetching, onChange, onClick }) {
  return (
    <Grid>
      <Row>
        <Col xs={12} md={12}>
          <Heading>Search for movies</Heading>
          <hr />
        </Col>
      </Row>
      <form onSubmit={onClick}>
        <Row>
          <Col xs={12} md={12}>
            <Input
              value={selectedTitle}
              placeholder="Enter movie name..."
              type="text"
              onChange={e => onChange(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Button type="submit">
              {isFetching ? "Searching..." : "Search"}
            </Button>
            {/* <Button type="submit" onClick={onClick}>
              {isFetching ? "Searching..." : "Search"}
            </Button> */}
          </Col>
        </Row>
      </form>
    </Grid>
  );
}

export default MoviesSearch;
