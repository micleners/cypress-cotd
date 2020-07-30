import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import { firebaseApp } from '../base';
import firebase from 'firebase';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func,
    delete: PropTypes.func,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    // whenever auth state changes
    firebase.auth().onAuthStateChanged((user) => {
      // if there is a user logged in
      if (user) {
        // run the auth handler with the user
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    // set uid on the state
    this.setState({
      uid: authData.user.uid,
      owner: authData.user.uid,
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log out!</button>;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button type="button" onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
