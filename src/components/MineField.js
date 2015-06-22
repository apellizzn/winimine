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

  propagate: function(coordinates){
    var currentCell =  this.refs[coordinates.row + "" + coordinates.column ];
    var filterBy = [];
    for(var row = coordinates.row - 1; row <= coordinates.row + 1; row ++ ){
      for(var column = coordinates.column - 1; column <= coordinates.column + 1; column ++ ){
        var candidate = {row: row, column: column};
        if(candidate.row !== coordinates.row || candidate.column !== coordinates.column) filterBy.push(candidate);
      }
    }

    currentCell.state.flipped = true;
    
    var adjacent = _.filter(this.refs, function(cell){
      return _.some(filterBy, { row: cell.props.row, column: cell.props.column});
    });

    var points =  _.sum(adjacent, function(cell) { return cell.props.isBomb ? 1 : 0;});
    
    currentCell.setState({content: points > 0 ? points: 'E'});
    if(points > 0) return;
    
    _.map(
      _.filter(adjacent, function(cell) {
          return _.some(filterBy, { row: cell.props.row, column: cell.props.column}) && !cell.state.flipped;
        }
      ), function(component){ 
        if(!component.state.flipped){
          component.state.flipped = true;
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
          tableCells.push(<td><Cell ref={n+""+k} key={n} flipped={false} propagate={self.propagate} row={n} column={k} onLost={self.props.onLost} isBomb={_.some(bombsCoordinates, { row: n , column: k})}/></td>);
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

  _onDialogSubmit: function(){
    alert("end");
  },

  render: function () {
    if(this.isValid()) { return (this.generateField()); }
    else { return(<h1>Empty</h1>); }
  }
});

module.exports = MineField; 
