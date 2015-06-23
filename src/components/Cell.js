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

	getInitialState: function(){
		return {
			flipped: false,
			content: null
		};
	},

	flip: function(event){
		if(!this.props.isBomb){
			this.props.propagate({ row: this.props.row, column: this.props.column});
		}
		var element = $(this.getDOMNode());
	},

	render: function () {
		var content = this.state.content != null ? this.state.content : null;
		content = this.props.isBomb ? 'B' : content;
		var className = 'cell ';
		if(content == null || content == '+') {
			className += 'empty';
		} else if(content == 'B'){
			className += 'bomb';
		} else {
			className += 'number'
		}
		return(
			<div className={className} onClick={this.state.flipped ? null : this.flip}> 
				{ content == null || content == 'E' ? '' : content }
			</div>
		);
	}
})

module.exports = Cell;
