import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

  storeInput = React.createRef();

  goToStore = event => {
    event.preventDefault();
    console.log(this.storeInput);
    const storeName = this.storeInput.current.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <input
          type="text"
          ref={this.storeInput}
          required
          placeholder="Enter Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
