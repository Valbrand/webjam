import React, { Component, PropTypes } from 'react';
import { Stage, Layer } from 'react-konva';

import Background from './Background.jsx';
import OscillatorNode from './OscillatorNode.jsx';

export default class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      rectangles: []
    };

    this.stage = null;

    this.showPos = this.showPos.bind(this);
  }

  componentDidMount() {
    this.stage = this.refs.stage.getStage();
  }

  showPos(event) {
    const { x, y } = this.stage.getPointerPosition();

    this.setState({
      rectangles: [...this.state.rectangles, { x, y }]
    });
  }

  render() {
    return (
      <Stage ref="stage" width={this.props.width} height={this.props.height}>
        <Layer onClick={this.showPos}>
          <Background width={this.props.width} height={this.props.height} />
          {this.state.rectangles.map((rectCenter, index) => {
            return (
              <OscillatorNode
                key={index}
                centerX={rectCenter.x}
                centerY={rectCenter.y}
              />
            );
          })}
        </Layer>
      </Stage>
    );
  }
}

App.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
