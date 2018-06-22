import fetch from "cross-fetch";

export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const RECEIVE_MOVIES = "RECEIVE_MOVIES";
export const SET_TITLE = "SET_TITLE";
export const SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE";
export const RESET_SEARCH_ERROR = "RESET_SEARCH_ERROR";

export function setTitle(title) {
  return {
    type: SET_TITLE,
    title
  };
}

export function resetSearchError() {
  return {
    type: RESET_SEARCH_ERROR
  };
}

export function searchMovies(title) {
  return {
    type: SEARCH_MOVIES,
    title
  };
}

export function searchMoviesFailure(error) {
  return {
    type: SEARCH_MOVIES_FAILURE,
    error
  };
}

function receiveMovies(title, json) {
  // console.log(json);
  return {
    type: RECEIVE_MOVIES,
    title,
    movies: json.Search.map(child => {
      return { title: child.Title, year: child.Year, poster: child.Poster };
    }),
    receivedAt: Date.now()
  };
}

export function fetchMovies(title) {
  return dispatch => {
    dispatch(searchMovies(title));
    return (
      fetch(`http://www.omdbapi.com/?apikey=29909c8a&s=${title}`)
        .then(
          response => {
            response.json().then(json => {
              console.log(json);
              if (!response.ok || json.Response === "False") {
                // return Promise.reject(json);
                dispatch(searchMoviesFailure("No results found!"));
              } else {
                dispatch(receiveMovies(title, json));
              }
            });
          },
          error => {
            console.log("An error occurred.", error);
            dispatch(searchMoviesFailure(error));
          }
        )
        // .then(json => dispatch(receiveMovies(title, json, null)))
        .catch(err => {
          console.log("An error is caught", err);
        })
    );
  };
}
