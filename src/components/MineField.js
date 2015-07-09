(function () {
	'use strict';

	var React = require('react/addons');
	var Cell = require('./Cell.js');
	var _ = require('lodash');
	require('styles/MineField.css');

	var MineField = React.createClass({
		propTypes: {
			field: React.PropTypes.array,
			rows: React.PropTypes.number,
			cols: React.PropTypes.number,
			onLost: React.PropTypes.func
		},
		getInitialState: function () {
			return {
				field: [],
				rows: 0,
				cols: 0
			};
		},

		getAdjacentCells: function(coordinates){

			return _.filter(this.refs, function(cell){
				return (cell.props.row === coordinates.row - 1 && _.inRange(cell.props.column, coordinates.column - 1, coordinates.column + 2) ) ||
								(cell.props.row === coordinates.row + 1 && _.inRange(cell.props.column, coordinates.column - 1, coordinates.column + 2) ) ||
								(cell.props.row === coordinates.row && (cell.props.column === coordinates.column - 1 || cell.props.column === coordinates.column + 1));
			});
		},

		propagate: function(coordinates){
			var currentCell = this.refs[coordinates.row + '&' + coordinates.column ];
			var adjacentCells = this.getAdjacentCells(coordinates);

			currentCell.state.flipped = true;

			var points = _.sum(adjacentCells, function(cell) { return cell.props.isBomb ? 1 : 0; });

			currentCell.setState({ content: points > 0 ? points : 'E' });

			if(points > 0) { return; }

			_.map(adjacentCells, function(component){
					if(!component.state.flipped){
						component.flip();
					}
				}
			);
		},

		drawField: function() {
			var self = this;
			var matrix = _.chunk(this.props.field, this.props.rows);
			var tableRows = [];
			_.each(matrix, function (row, rowIndex) {
				var tableCells = [];
				_.each(row, function (cell, celIndex ) {
					tableCells.push(<td><Cell ref={rowIndex + '&' + celIndex} key={self.key + rowIndex + '&' + celIndex} flipped={false} propagate={self.propagate} row={rowIndex} column={celIndex} onLost={self.props.onLost} isBomb={cell}/></td>);
				});
				tableRows.push(<tr>{tableCells}</tr>);
			});
			return (<table className="field">{tableRows}</table>);
		},

		render: function () {
			return ( this.drawField() );
		}
	});

	module.exports = MineField;
}());
