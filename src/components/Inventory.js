import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

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

  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
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
