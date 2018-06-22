import React from "react";
import { createStore } from "redux";
import configureStore from "../configureStore";
import { Provider, connect } from "react-redux";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "react-testing-library";
import reducer from "../reducers";
import App from "../App";

afterEach(cleanup);

function renderWithRedux(ui, { initialState, store = configureStore() } = {}) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

test("search for a movie with 1 character", () => {
  // Arrange
  const {
    getByPlaceholderText,
    getByLabelText,
    getByTestId,
    getByText
  } = renderWithRedux(<App />);
  const searchBar = getByPlaceholderText("Enter movie name...");
  const searchButton = getByText("Search");
  searchBar.value = "h";

  //Act
  fireEvent.click(getByText("Search"));

  //Assert
  expect(getByText("Please enter at least 2 characters!")).not.toBeNull();
});

test("searching for a movie with 2 or more characters i.e. hugo should return 5 results", async () => {
  // Arrange
  const {
    getByPlaceholderText,
    getByLabelText,
    getByTestId,
    getByText,
    queryAllByText,
    queryAllByTestId,
    queryByText,
    container
  } = renderWithRedux(<App />);

  const searchBar = getByTestId("search-input");
  const searchButton = getByText("Search");
  searchBar.value = "hugo";
  fireEvent.change(searchBar);
  //   console.log(searchBar.value);

  //Act
  fireEvent.click(getByText("Search"));
  expect(queryByText("Please enter at least 2 characters!")).toBeNull();
  const searchingTextNode = await waitForElement(() =>
    getByText("Searching...")
  );

  const searchTextNode = await waitForElement(() =>
    getByText("Search")
  );

  //Assert
  expect(queryAllByTestId("search-panel")).toHaveLength(5);
});
