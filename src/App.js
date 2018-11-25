import React, { Component } from 'react';
import './App.css';

// A graphic representation of one knitted stitch
function Stitch(props) {
  return (
    <span className="stitch"
      style={{ backgroundColor: props.color }}>
      v
    </span>
  );
}

// a knitted patch
class Patch extends Component {
  state = {stitchWidth: 2};
  constructor(props) {
    super(props);
    this.state = {
      stitchWidth: 6,
      stitches: ['#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF'],
      skane: ['#F00FFF', '#FFF00F', '#F00F00', '#00FFF0', '#FF000F', '#0FF0F0', '#000FFF', '#0F000F', '#F0F0FF']
    };
    this.resizePatch = this.resizePatch.bind(this); // fix for wrong this
  }

  getColor(i) {
    console.log('getColor for i:', i);
    return (i) ? '#FF0000' : '#00FF00';
  }

  renderStitchRow(i) {
    const dynamic_stitches = [];
    let sw = this.state.stitchWidth;
    while (sw > 0) {
      dynamic_stitches.push(<Stitch key={sw} color={this.state.stitches[i]} />);
      sw -= 1;
    }
    return (
      <div className="patch-row">
        {dynamic_stitches}
      </div>
    );
  }

  resizePatch(newSize) {
    console.log(newSize);
    this.setState({stitchWidth: newSize});
  }

  render() {
    // let patch = [];
    // const skane_repeat_len = this.state.skane.length;
    // this.state.skane.map((s) => {
    //   patch.push();    
    return (
      <div style={{ Width: '800px', Height: '500px', backgroundColor: '#EEEEEE' }}>
        <div className="container-drag">
          {this.renderStitchRow(0)}
          {this.renderStitchRow(1)}
          {this.renderStitchRow(2)}
        </div>
        <Resizer startX={50} label="slide this" onClick={this.resizePatch} />
      </div>
    );
  }
}

class Resizer extends Component {
  state = {};
  offset = 30;
  constructor(props) {
    super(props);
    this.state = { used: false, startX: props.startX, drag: false };
  }
  start(event) {
    this.setState({ used: true, startX: event.clientX - this.offset, drag: true });
  }
  drag(event) {
    if (this.state.drag) {
      this.setState({ startX: event.clientX - this.offset });
    }
  }
  end(event) {
    this.setState({ drag: false });
    this.props.onClick(Math.floor(this.state.startX / 20)+2);
  }
  getXPos() {
    if (this.state.used) { return this.state.startX; }
    else { return this.props.startX; }
  }
  render() {
    return (
      <div style={{ position: "absolute", left: this.getXPos() }}
        onMouseDown={(e) => this.start(e)}
        onMouseMove={(e) => this.drag(e)}
        onMouseUp={(e) => this.end(e)}
        onMouseOut={(e) => this.end(e)}
      >
        {this.props.label}
      </div>);
  }
}

class App extends Component {
  render() {
    return (
      <div className="knit">
        <div className="knit-patch">
          <Patch />
        </div>
        <div className="knit-info">
          <div>{/* status */}</div>
        </div>
      </div>
    );
  }
}

export default App;
