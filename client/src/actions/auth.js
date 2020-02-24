import axios from "axios";
// can use setalert actions
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  // sending data -> need to create config
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    // if everything is ok, dispatch register success
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    // errors will be an array
    const errors = err.response.data.errors;
    // if there are errors, loop through them and dispatch setAlert
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
