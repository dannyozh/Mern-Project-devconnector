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
