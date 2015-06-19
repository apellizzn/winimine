'use strict';

var React = require('react/addons');
var Cell = require('./Cell.jsx');
var _ = require('lodash');
var mui = require('material-ui');
var Dialog = mui.Dialog;
require('styles/MineField.css');

var MineField = React.createClass({
  propTypes: {
    rows: React.PropTypes.number,
    collumns: React.PropTypes.number,
    bombs: React.PropTypes.number,
    onLost: React.PropTypes.func
  },

  lost: function(){
    this.props.onLost();
  },

  createCoordinates: function(rowValues, collumnsValues){
    var result = [];
    rowValues.forEach(function(row){
      collumnsValues.forEach(function(column){
        result.push({row: row, column: column})
      });
    });
    return result;
  },

  getCoordinates: function(){
    return this.createCoordinates(
      _.range(this.props.rows), 
      _.range(this.props.collumns)
    );
  },

  generateBombsPositions: function(){
    return _.sample(this.getCoordinates(), this.props.bombs);
  },

  buildField: function(){
    var self = this;
    var bombsCoordinates = this.generateBombsPositions();
    var result = [];
    _.times(this.props.rows, function(n) {
        _.times(self.props.collumns, function(k){
          result.push(<div className="cell"><Cell key={n+" "+k} onLost={self.props.onLost} isBomb={_.some(bombsCoordinates, { row: n , column: k})}/></div>);
        }); 
    });
    return (<div className="field">{result}</div>);
  },

  isValid: function (){
    return this.props.rows && this.props.collumns && this.props.bombs 
            && this.props.rows > 0 && this.props.collumns > 0 
            && ( this.props.bombs < this.props.rows * this.props.collumns);
  },

  _onDialogSubmit: function(){
    alert("end");
  },

  render: function () {
    if(this.isValid()) { return ( this.buildField() ); }
    else { return(<h1>Empty</h1>); }
  }
});

module.exports = MineField; 
