import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from "./types";

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

// Get All Profiles
export const getProfiles = () => async dispatch => {
  // clear existing profiles before getting new ones
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");
    // it'll know which profile to load from token

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
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

// Get Github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    // it'll know which profile to load from token

    dispatch({
      type: GET_REPOS,
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

// add experience to profile
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // make the post request to api/profile
    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    // alert to show what kind of post request
    dispatch(setAlert("Experience Added", "success"));

    // redirect to dashboard
    history.push("/dashboard");
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

// add education to profile
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // make the post request to api/profile
    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    // alert to show what kind of post request
    dispatch(setAlert("Education Added", "success"));

    // redirect to dashboard
    history.push("/dashboard");
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

// Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    // show alert once exp delted

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    // show alert once exp delted

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm(`Are you sure? This can NOT be undone!`)) {
    try {
      const res = await axios.delete("/api/profile/");
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      // show alert once account deleted
      dispatch(setAlert("Your account has been permenantly deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
