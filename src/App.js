import React, { Component } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import MoviesSearch from "./components/MoviesSearch";
import logo from "./logo.svg";
import "./App.css";
import SearchResults from "./components/SearchResults";
import { connect } from "react-redux";
import { fetchMovies, searchMovies, setTitle } from "./actions";

const Body = styled.section`
  margin-top: 120px;
`;

let searchResults = [];

class App extends Component {
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
    console.log(`Button clicked`);
    this.props.dispatch(fetchMovies(this.props.selectedTitle));
  }

  render() {
    const { selectedTitle, isFetching, items } = this.props;
    // console.log(selectedTitle)
    return (
      <div className="App">
        <Header title="Welcome to Banana MDB" />
        <Body>
          <MoviesSearch
            value={selectedTitle}
            isFetching = {isFetching}
            onChange={this.handleChange}
            onClick={this.handleClick}
          />
          <SearchResults searchResults={items.slice(0,5)} />
        </Body>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedTitle } = state;
  const { isFetching, lastUpdated, items } = state.movies;
  return {
    selectedTitle,
    isFetching,
    lastUpdated,
    items
  };
}

export default connect(mapStateToProps)(App);
