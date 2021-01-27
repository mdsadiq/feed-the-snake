import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import config from "../config";
import { MODES } from "../constants";

class Base extends PureComponent {
  render() {
    const { item, mode } = this.props;
    let className = "base-block";
    if (mode === MODES.dev) {
      className += " dev";
      console.log("base -> ", mode);
    }
    return (
      <div
        className={className}
        style={{
          backgroundColor: item ? config[item].color : "lightgray"
        }}
      />
    );
  }
}

export default Base;

Base.propTypes = {
  item: PropTypes.oneOf(["block", "food", "worm"]),
  mode: PropTypes.string
};

// display: 'inline-block',
// height: '2.5em',
// width: '2.5em',
// border: '.2px solid #a8a8a9',
