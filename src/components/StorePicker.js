import React, { Component } from "react";
import { getFunName } from "../helpers";

export class StorePicker extends Component {
  myInput = React.createRef();

  goToStore = event => {
    event.preventDefault();
    const storeName = this.myInput.current.value;

    // Go to the store with value in the input
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          placeholder="Store Name"
          ref={this.myInput}
          required
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
