+'use strict';

var React = require('react/addons');
var Cell = require('./Cell.js');
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
    var coordinates = [];
    rowValues.forEach(function(row){
      collumnsValues.forEach(function(column){
        coordinates.push({row: row, column: column})
      });
    });
    return coordinates;
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

  getAdjacentCells: function(coordinates){

    return _.filter(this.refs, function(cell){
      return  ( cell.props.row === coordinates.row - 1 && _.inRange(cell.props.column, coordinates.column - 1 , coordinates.column + 2) ) ||
              ( cell.props.row === coordinates.row + 1 && _.inRange(cell.props.column, coordinates.column - 1 , coordinates.column + 2) ) ||
              ( cell.props.row === coordinates.row  && (cell.props.column === coordinates.column - 1 || cell.props.column === coordinates.column + 1))
    });
  },

  propagate: function(coordinates){
    var currentCell =  this.refs[coordinates.row + "&" + coordinates.column ];
    var adjacentCells = this.getAdjacentCells(coordinates);
   
    currentCell.state.flipped = true; 

    var points =  _.sum(adjacentCells, function(cell) { return cell.props.isBomb ? 1 : 0;});
    
    currentCell.setState({content: points > 0 ? points: 'E'});
    
    if(points > 0) return;
    
    _.map(adjacentCells, function(component){ 
        if(!component.state.flipped){
          component.flip();
        }
      }
    );
  },

  generateField: function(){
    var self = this;
    var result = [];
    var bombsCoordinates = this.generateBombsPositions();
    var tableRows = [];
    _.times(this.props.rows, function(n) {
        var tableCells = [];
        _.times(self.props.collumns, function(k){
          tableCells.push(<td><Cell ref={n+"&"+k} key={n} flipped={false} propagate={self.propagate} row={n} column={k} onLost={self.props.onLost} isBomb={_.some(bombsCoordinates, { row: n , column: k})}/></td>);
        });
        tableRows.push(<tr>{tableCells}</tr>) 
    });
    return (<table className="field">{tableRows}</table>);
  },

  isValid: function (){
    return this.props.rows && this.props.collumns && this.props.bombs 
            && this.props.rows > 0 && this.props.collumns > 0 
            && ( this.props.bombs < this.props.rows * this.props.collumns);
  },

  render: function () {
    if(this.isValid()) { return (this.generateField()); }
    else { return (<h1>Please enter a valid configuration</h1>); }
  }
});

module.exports = MineField; 
