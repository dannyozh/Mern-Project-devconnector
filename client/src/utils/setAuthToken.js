// function that takes in token.
// if token is there, it will ad to tokens.
// if not it'll delete from headers

import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // if token is there
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    //  delete
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
