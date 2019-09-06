import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;

    // Get the previous order from localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // Sync firebase database with the state
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    // Save the Order in localstorage
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    // When the component stop sync with firebase
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // Create new fishes with previous state
    const fishes = { ...this.state.fishes };

    // Add the fish from arguments with a new key using the date
    fishes[`fish${Date.now()}`] = fish;

    console.log(fishes);
    // Update fishes state
    this.setState({ fishes });
  };

  editFish = (key, modifiedfish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = modifiedfish;
    this.setState({ fishes });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    // Get from sample-fishes.js object to state
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // Create new Order with previous state
    const order = { ...this.state.order };

    // Plus one if the fish was already in the list if not just put a 1
    order[key] = order[key] + 1 || 1;

    // Update Order in state
    this.setState({ order });
  };

  deleteFromOrder = key => {
    const order = { ...this.state.order };

    delete order[key];

    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(k => (
              <Fish
                key={k}
                details={this.state.fishes[k]}
                addToOrder={this.addToOrder}
                index={k}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          editFish={this.editFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
