import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Row, Col, Panel } from "react-bootstrap";
import MoviePanel from "./MoviePanel";

function SearchResults({ searchResults = [] }) {
  const movies = searchResults.map(movie => <MoviePanel movie={movie} />);
  return <Grid>{movies}</Grid>;
}

export default SearchResults;
