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
  state = { stitchWidth: 2 };
  constructor(props) {
    super(props);
    this.state = {
      backieForthie: false,
      stitchWidth: 2,
      skane: ['#F00FFF', '#F00FFF', '#F00FFF', '#F00FFF', '#FFF00F', '#FFF00F', '#FFF00F', ' hsl(120,30%,30%)']
      //      skane: ['#F00FFF', '#FFF00F', '#F00F00', '#00FFF0', '#FF000F', '#0FF0F0', '#000FFF', '#0F000F', '#F0F0FF']
    };
    this.resizePatch = this.resizePatch.bind(this); // fix the access of the wrong 'this'
    this.updateBackForth = this.updateBackForth.bind(this);
  }

  getIndex(rowSize, row, column) {
    return rowSize * row + column;
  }

  getColor(i) {
    // console.log('getColor for i:', i);
    const sl = this.state.skane.length;
    return this.state.skane[i % sl];
  }

  renderStitchRow(row) {
    let dynamic_stitches = [];
    let sw = this.state.stitchWidth;
    let i = row * sw;
    while (sw > 0) {
      dynamic_stitches.push(<Stitch column={sw} color={this.getColor(i)} />);
      i += 1;
      sw -= 1;
    }
    if (this.state.backieForthie && (row % 2) === 1) {
      dynamic_stitches = dynamic_stitches.reverse();
    }
    return (
      <div className="patch-row">
        {dynamic_stitches}
      </div>
    );
  }

  resizePatch(newSize) {
    // console.log(newSize);
    this.setState({ stitchWidth: newSize });
  }

  updateBackForth(checked) {
    // console.log(checked);
    this.setState({ backieForthie: checked });
  }

  render() {
    return (
      <div >
          {this.renderStitchRow(0)}
          {this.renderStitchRow(1)}
          {this.renderStitchRow(2)}
          {this.renderStitchRow(3)}
          {this.renderStitchRow(4)}
          {this.renderStitchRow(5)}
          {this.renderStitchRow(6)}
          {this.renderStitchRow(7)}
        <Resizer startX={20} label={'<-- ' + this.state.stitchWidth + ' stitches to cast on -->'} onClick={this.resizePatch} />
        <CheckBox label="backie forthie" uniqueId="bfcb" onChange={this.updateBackForth} />
      </div>
    );
  }
}

class Resizer extends Component {
  state = {};
  offset = 60;
  constructor(props) {
    super(props);
    this.state = { used: false, startX: props.startX, drag: false };
  }
  start(event) {
    this.setState({ used: true, startX: Math.max(0, event.clientX - this.offset), drag: true });
  }
  drag(event) {
    if (this.state.drag) {
      this.setState({ startX: Math.max(0, event.clientX - this.offset) });
      this.props.onClick(Math.floor(this.state.startX / 8) + 2);
    }
  }
  end(event) {
    this.setState({ drag: false });
    this.props.onClick(Math.floor(this.state.startX / 8) + 2);
  }
  getXPos() {
    if (this.state.used) { return this.state.startX; }
    else { return this.props.startX; }
  }
  render() {
    return (
      <div className="knitting-slider" style={{ position: "absolute", left: this.getXPos() }}
        onMouseDown={(e) => this.start(e)}
        onMouseMove={(e) => this.drag(e)}
        onMouseUp={(e) => this.end(e)}
        onMouseOut={(e) => this.end(e)}
      >
        {this.props.label}
      </div>);
  }
}


class CheckBox extends Component {
  render() {
    return (
      <span>
        <input id={this.props.uniqueId} type="checkbox"
          onChange={(e) => this.props.onChange(e.target.checked)}
        />
        <label htmlFor={this.props.uniqueId}> {this.props.label} </label>
      </span>
    );
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
