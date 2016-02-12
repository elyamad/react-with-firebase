import React from 'react';
import { Input } from 'react-bootstrap';

var NoteInput = React.createClass({
  propsType: {
    isValid: React.PropTypes.fn
  },

  getInitialState() {
    return{
      defaultValue: 1,
      value: 1,
      style: null,
      errorMsg: 'Note must be between 1 and 5'
    }
  },

  validationState() {
    return this.state.style
  },

  handleChange(e) {
    var value = e.target.value;
    var newStyle = this.isValid(value) ? 'success' : 'error';
    this.setState({style: newStyle, value: value});
  },
  isValid(value) {
    return value ? !(value < 1 || value > 5) : this.isValid(this.state.value) ;
  },

  componentWillMount(){
    this.props.isValid(this.isValid(this.state.value));
  },

  render() {
    return (
      <Input
        type="number"
        label="Note"
        defaultValue={this.state.defaultValue}
        placeholder="1 to 5, eg: 3"
        help={this.isValid() || this.state.style == null ? null : this.state.errorMsg}
        bsStyle={this.validationState()}
        ref="input"
        wrapperClassName="col-xs-10"
        labelClassName="col-xs-2"
        onChange={this.handleChange}
      />
    );
  },
  componentDidUpdate(prevProps, prevState) {
    // notify parent by changes
    if(this.state !== prevState){
      this.props.isValid(this.isValid(this.state.value));
    }
  }
});

module.exports = NoteInput;
