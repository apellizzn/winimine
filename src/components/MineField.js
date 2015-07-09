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
				matrix: []
			};
		},

		getAdjacentCells: function(coordinates){
			return _.filter(this.state.matrix, function(cell){
				return (cell.row === coordinates.row - 1 && _.inRange(cell.column, coordinates.column - 1, coordinates.column + 2) ) ||
								(cell.row === coordinates.row + 1 && _.inRange(cell.column, coordinates.column - 1, coordinates.column + 2) ) ||
								(cell.row === coordinates.row && (cell.column === coordinates.column - 1 || cell.column === coordinates.column + 1));
			});
		},

		flipCells: function (cells) {
			var self = this;
			_.map(cells, function(cell){
					if(!cell.flipped){ self.refs[cell.id].flip(); }
				}
			);
		},

		propagate: function(coordinates){
			var adjacentCells = this.getAdjacentCells(coordinates);
			var currentCell = _.find(this.state.matrix, coordinates);
			currentCell.flipped = true;

			var points = _.sum(adjacentCells, function(cell) { return cell.value; });

			this.refs[currentCell.id].setState({ content: points > 0 ? points : -1 });
			if(points <= 0) { this.flipCells(adjacentCells); }
		},

		drawField: function() {
			var self = this;
			var tableRows = [];
			var table = _.chunk(this.props.field, this.props.rows);
			_.each(table, function (cells, rowIndex) {
				var tableCells = [];
				_.each(cells, function (value, celIndex) {
					var id = rowIndex + '&' + celIndex;
					var el = <Cell ref={id} key={self.key + id} propagate={self.propagate} row={rowIndex} column={celIndex} onLost={self.props.onLost} isBomb={value}/>;
					tableCells.push(<td>{ el }</td>);
					self.state.matrix.push({ value: value, row: rowIndex, column: celIndex, flipped: false, id: id });
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
