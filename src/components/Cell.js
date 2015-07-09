(function (){
	'use strict';
	var React = require('react/addons');
	require('styles/Cell.css');

	var Cell = React.createClass({

		propTypes: {
			onLost: React.PropTypes.func,
			isBomb: React.PropTypes.bool,
			propagate: React.PropTypes.func,
			row: React.PropTypes.number,
			column: React.PropTypes.number
		},

		getInitialProps: function () {
			return {
				flipped: false
			};
		},

		getInitialState: function(){
			return {
				flipped: false,
				content: null
			};
		},

		flip: function(){
			if(!this.props.isBomb){
				this.props.propagate({ row: this.props.row, column: this.props.column});
			} else {
				this.props.onLost();
			}
		},

		render: function () {
			var content = this.state.content != null ? this.state.content : null;
			content = this.props.isBomb ? 'B' : content;
			var className = 'cell ';
			if(content === null || content === '+') {
				className += 'empty';
			} else if(content === 'B'){
				className += 'bomb';
			} else {
				className += 'number';
			}
			return (
				<div className={className} onClick={this.state.flipped ? null : this.flip}>
					{ content === null || content === -1 ? '' : content }
				</div>
			);
		}
	});
	module.exports = Cell;
}());
