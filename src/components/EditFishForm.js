import React, { Component } from "react";
import PropTypes from "prop-types";

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    editFish: PropTypes.func,
    deleteFish: PropTypes.func
  };
  handleOnChange = e => {
    const name = e.currentTarget.name;

    const value =
      name === "price"
        ? parseFloat(e.currentTarget.value)
        : e.currentTarget.value;

    const modifiedfish = {
      ...this.props.fish,
      [e.currentTarget.name]: value
    };

    this.props.editFish(this.props.index, modifiedfish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleOnChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleOnChange}
          value={this.props.fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleOnChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh!!</option>
          <option value="unavailable">Sold Out!!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleOnChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleOnChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
