import React, { Component, PropTypes } from 'react';
import { Circle } from 'react-konva';

export default class OscillatorNode extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: Konva.Util.getRandomColor()
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  }

  render() {
    const width = 50;
    const height = 50;

    return (
      <Circle
        x={this.props.centerX}
        y={this.props.centerY}
        width={width}
        height={height}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

OscillatorNode.propTypes = {
  centerX: PropTypes.number.isRequired,
  centerY: PropTypes.number.isRequired,
};
