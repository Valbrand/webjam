import React, { Component, PropTypes } from 'react';
import { Rect } from 'react-konva';

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

    const widthToCenterOffset = width / 2;
    const heightToCenterOffset = height / 2;

    return (
        <Rect
            x={this.props.centerX - widthToCenterOffset}
            y={this.props.centerY - widthToCenterOffset}
            width={width}
            height={height}
            fill={this.state.color}
            shadowBlur={10}
            onClick={this.handleClick}
        />
    );
  }
}

OscillatorNode.propTypes = {
  centerX: PropTypes.number.isRequired,
  centerY: PropTypes.number.isRequired,
};
