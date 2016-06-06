import App from './components/App.jsx';
import React from 'react';
import { render } from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const width = container.clientWidth;
  const height = container.clientHeight;

  render(<App width={width} height={height} />, container);
});
