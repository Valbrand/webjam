import React, { Component, PropTypes } from 'react';
import { Stage, Layer } from 'react-konva';

import Background from './Background.jsx';
import OscillatorNode from './OscillatorNode.jsx';

export default class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      oscillators: [],
    };

    this.stage = null;
    this.audioContext = this.createAudioContext();

    this.createOscillator = this.createOscillator.bind(this);
  }

  componentDidMount() {
    this.stage = this.refs.stage.getStage();
  }

  createAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    return AudioContext ? (new AudioContext()) : null;
  }

  createOscillator(event) {
    const { x, y } = this.stage.getPointerPosition();

    this.setState({
      oscillators: [...this.state.oscillators, { x, y }]
    });
  }

  moveOscillatorNode(index) {
    return (evt) => {
      const { x, y } = evt.target.attrs;

      this.setState({
        oscillators: this.state.oscillators.map((oscillator, oscIndex) => {
          if (index === oscIndex) {
            oscillator.x = x;
            oscillator.y = y;
          }

          return oscillator;
        }),
      });
    }
  }

  removeOscillatorNode(index) {
    return () => {
      this.setState({
        oscillators: this.state.oscillators.filter((oscillator, oscIndex) => oscIndex !== index),
      });
    }
  }

  render() {
    return (
      <div>
        <Stage ref="stage" width={this.props.width} height={this.props.height}>
          <Layer>
            <Background width={this.props.width} height={this.props.height} onClick={this.createOscillator}/>
            {this.state.oscillators.map((oscillator, index) =>
              <OscillatorNode
                key={index}
                centerX={oscillator.x}
                centerY={oscillator.y}
                canvasWidth={this.props.width}
                canvasHeigth={this.props.height}
                audioContext={this.audioContext}
                onDragMove={this.moveOscillatorNode(index)}
                removalCallback={this.removeOscillatorNode(index)}
              />)}
          </Layer>
        </Stage>
      </div>
    );
  }
}

App.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
