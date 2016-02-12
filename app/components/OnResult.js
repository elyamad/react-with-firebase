import React from 'react';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

var OnResult = React.createClass({
  propsType: {
    visible: React.PropTypes.bool,
    value: React.PropTypes.string, // "success", "warning", "danger"
    headerMsg: React.PropTypes.string,
    contentMsg: React.PropTypes.string
  },

  render() {
    if(this.props.visible){
      return (
        <ListGroup>
          <ListGroupItem header={this.props.headerMsg} bsStyle={this.props.result}>{this.props.contentMsg}</ListGroupItem>
        </ListGroup>
      );
    }
    else {
      return null;
    }
  }
});

module.exports = OnResult;
