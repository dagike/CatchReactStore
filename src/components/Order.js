import React, { Component } from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };

    // Fish needs to be loaded before
    if (!fish) return null;

    if (fish.status !== "available")
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>Sorry {fish ? fish.name : "fish"} is not available</li>
        </CSSTransition>
      );

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.deleteFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);

    const total = orderIds.reduce((acc, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === "available";

      if (isAvailable) return acc + count * fish.price;

      return acc;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
