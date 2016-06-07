import React, { Component, PropTypes } from 'react';
import { Circle } from 'react-konva';

export default class OscillatorNode extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      color: Konva.Util.getRandomColor(),
      type: 'sine',
    };

    this.oscillator = null;
    this.gainNode = null;

    this.handleClick = this.handleClick.bind(this);
  }

  getGainFromPosition() {
    return this.props.centerY / this.props.canvasHeigth;
  }

  getFrequencyFromPosition() {
    return 200 + ((this.props.centerX / this.props.canvasWidth) * 1800);
  }

  setupAudioNodes() {
    this.oscillator.type = this.state.type;
    this.oscillator.frequency.value = this.getFrequencyFromPosition();

    this.gainNode.gain.value = this.getGainFromPosition();
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
        color: Konva.Util.getRandomColor()
      });
    }
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
        draggable={true}
        shadowBlur={5}
        onClick={this.handleClick}
        onDragMove={this.props.onDragMove}
      />
    );
  }
}

OscillatorNode.propTypes = {
  centerX: PropTypes.number.isRequired,
  centerY: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  canvasHeigth: PropTypes.number.isRequired,
  audioContext: PropTypes.object.isRequired,
  onDragMove: PropTypes.func.isRequired,
  removalCallback: PropTypes.func.isRequired,
};
