import React from "react";
import PropTypes from "prop-types";

const Login = props => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store's inventory.</p>
    <button className="github" onClick={() => props.authenticate("Github")}>
      Login In With Github
    </button>
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      Login In With Facebook
    </button>
    <button className="twitter" onClick={() => props.authenticate("Twitter")}>
      Login In With Twitter
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
