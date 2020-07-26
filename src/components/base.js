import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import config from "../config";

class Base extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const { item } = this.props;

    return (
      <div
        className="base-block"
        style={{
          backgroundColor: item ? config[item].color : "lightgray"
        }}
      />
    );
  }
}

export default Base;

Base.propTypes = {
  item: PropTypes.oneOf(["block", "food", "worm"])
};

// display: 'inline-block',
// height: '2.5em',
// width: '2.5em',
// border: '.2px solid #a8a8a9',
