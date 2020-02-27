import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

// Get current user's profile

export const getCurrentProfile = () => async dispatch => {
  // make request to backend
  try {
    const res = await axios.get("/api/profile/me");
    // it'll know which profile to load from token

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// create or update a profile
// history object has method called push for redirect to client side route
// edit parameter helps distinguish between creating/editing

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // make the post request to api/profile
    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    // alert to show what kind of post request
    dispatch(setAlert(edit ? "Profile Updated" : "Profile created", "success"));

    // if creating, redirect to dashboard
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    // if there are errors, loop through them and dispatch setAlert
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
