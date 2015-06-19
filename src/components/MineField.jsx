'use strict';

var React = require('react/addons');
var Cell = require('./Cell.jsx');

require('styles/MineField.css');

var MineField = React.createClass({
  propTypes: {
    rows: React.PropTypes.number,
    collumns: React.PropTypes.number,
    bombs: React.PropTypes.number
  },

  buildField: function(){
    var horizontal = [];
    for(var i = 0; i < this.props.rows ; i++ ){
      var vertical = [];
      for(var k =0; k< this.props.collumns; k++){
        vertical.push(
          <td><Cell/></td>);
      }
      horizontal.push(<tr>{vertical}</tr>);
    }
    return (<table>{horizontal}</table>);
  },

  isValid: function (){
    return this.props.rows && this.props.collumns && this.props.bombs 
            && this.props.rows > 0 && this.props.collumns > 0 
            && ( this.props.bombs < this.props.rows * this.props.collumns);
  },

  render: function () {
    if(this.isValid()) { return ( this.buildField() ); }
    else { return(<h1>Empty</h1>); }
  }
});

module.exports = MineField; 
