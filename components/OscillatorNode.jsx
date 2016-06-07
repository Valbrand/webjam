import React, { Component, PropTypes } from 'react';
import { Circle, RegularPolygon } from 'react-konva';

const waveTypes = ['sine', 'square', 'triangle']
const waveTypeValues = {};

waveTypes.forEach((waveType, index) => {
  waveTypeValues[waveType] = index;
});

export default class OscillatorNode extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      color: Konva.Util.getRandomColor(),
      type: 0,
    };

    this.oscillator = null;
    this.gainNode = null;

    this.handleClick = this.handleClick.bind(this);
    this.setupAudioNodes = this.setupAudioNodes.bind(this);
  }

  getGainFromPosition(y) {
    return y / this.props.canvasHeight;
  }

  getFrequencyFromPosition(x) {
    return 200 + ((x / this.props.canvasWidth) * 1800);
  }

  setupAudioNodes() {
    const { x, y } = this.refs.component.attrs;

    this.oscillator.type = waveTypes[this.state.type];

    console.log(`oscillator type: ${this.oscillator.type}`);

    this.oscillator.frequency.value = this.getFrequencyFromPosition(x);

    this.gainNode.gain.value = this.getGainFromPosition(y);
  }

  componentDidMount() {
    this.oscillator = this.props.audioContext.createOscillator();
    this.gainNode = this.props.audioContext.createGain();

    this.setupAudioNodes();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.props.audioContext.destination);
    this.oscillator.start();
  }

  componentWillUnmount() {
    this.oscillator.stop();
    this.gainNode.disconnect();
    this.oscillator.disconnect();
  }

  componentWillUpdate() {
    this.setupAudioNodes();
  }

  handleClick(event) {
    event.evt.cancelBubble = true;

    if (event.evt.altKey) {
      this.props.removalCallback();
    } else {
      this.setState({
        color: Konva.Util.getRandomColor(),
        type: (this.state.type + 1) % 3,
      });

      this.setupAudioNodes();
    }
  }

  getVisualElement(renderOptions) {
    switch (this.state.type) {
      case waveTypeValues.sine:
        return (
          <Circle
            {...renderOptions}
            ref="component"
          />
        );
      case waveTypeValues.square:
        return (
          <RegularPolygon
            {...renderOptions}
            ref="component"
            sides={4}
            rotation={45}
          />
        );
      case waveTypeValues.triangle:
        return (
          <RegularPolygon
            {...renderOptions}
            ref="component"
            sides={3}
            rotation={0}
          />
        );
    }
  }

  render() {
    const renderOptions = {
      x: this.props.centerX,
      y: this.props.centerY,
      radius: 30,
      fill: this.state.color,
      draggable: true,
      shadowBlur: 5,
      onClick: this.handleClick,
      onDblClick: this.props.removalCallback,
      onDragMove: this.setupAudioNodes,
      onDragEnd: this.props.onDragEnd,
    };

    return this.getVisualElement(renderOptions);
  }
}

OscillatorNode.propTypes = {
  centerX: PropTypes.number.isRequired,
  centerY: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  audioContext: PropTypes.object.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  removalCallback: PropTypes.func.isRequired,
};
