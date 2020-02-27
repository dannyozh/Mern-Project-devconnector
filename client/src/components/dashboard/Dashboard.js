// fetch data using action
// bring it in using redux state
// pass it down to other components

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const maptStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(maptStateToProps, { getCurrentProfile })(Dashboard);
