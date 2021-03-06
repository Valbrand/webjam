import React, { Component, PropTypes } from 'react';
import { Rect } from 'react-konva';

export default class Background extends Component {
  render() {
    return (
      <Rect
        x={0}
        y={0}
        width={this.props.width}
        height={this.props.height}
        onClick={this.props.onClick}
        fill="white"
      />
    );
  }
}

Background.PropTypes = {
  onClick: PropTypes.func.isRequired,
}
