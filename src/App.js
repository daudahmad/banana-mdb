import React, { Component } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import MoviesSearch from "./components/MoviesSearch";
import logo from "./logo.svg";
import "./App.css";
import SearchResults from "./components/SearchResults";
import ErrorMessage from "./components/ErrorMessage";
import { connect } from "react-redux";
import {
  fetchMovies,
  searchMovies,
  setTitle,
  resetSearchError
} from "./actions";

const Body = styled.section`
  margin-top: 120px;
`;

let searchResults = [];

class App extends Component {
  initialState = { error: null };
  state = this.initialState;
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(title) {
    // console.log(title);
    this.props.dispatch(setTitle(title));
  }

  handleClick(event) {
    event.preventDefault();
    console.log(this.props.selectedTitle);
    if (this.props.selectedTitle.length < 2) {
      this.props.dispatch(resetSearchError());
      this.setState({ error: "Please enter at least 2 characters!" });
    } else {
      this.setState({ error: null });
      this.props.dispatch(fetchMovies(this.props.selectedTitle));
    }
  }

  render() {
    const { selectedTitle, isFetching, items, error } = this.props;
    // console.log(selectedTitle)
    return (
      <div className="App">
        <Header title="Welcome to Banana MDB" />
        <Body>
          {this.state.error && <ErrorMessage message={this.state.error} />}
          {error && <ErrorMessage message={error} />}
          <MoviesSearch
            value={selectedTitle}
            isFetching={isFetching}
            onChange={this.handleChange}
            onClick={this.handleClick}
          />
          <SearchResults searchResults={items.slice(0, 5)} />
        </Body>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedTitle } = state;
  const { isFetching, lastUpdated, items, error } = state.movies;
  return {
    selectedTitle,
    isFetching,
    lastUpdated,
    items,
    error
  };
}

export default connect(mapStateToProps)(App);
