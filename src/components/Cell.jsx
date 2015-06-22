"user strict;"

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
			points: 0
		};
	},

	flip: function(event){
    if(!this.props.isBomb){
    	this.props.propagate({ row: this.props.row, column: this.props.column});
		}
		var angle = 0;
    angle += 180;
    var element = $(this.getDOMNode());
    element.css('webkitTransition', '-webkit-transform 1.0s cubic-bezier(0,.75,.25,1)');
    element.css('webkitTransform', 'rotateY(' + angle + 'deg)');
  },
  
	render: function () {
		var back = this.props.isBomb ? 
			<img className="retro" src="https://d13yacurqjgara.cloudfront.net/users/149082/screenshots/1041104/bomb-explosion.gif"/> 
			: <img className="retro" src="https://d13yacurqjgara.cloudfront.net/users/799725/screenshots/2113098/___1x.jpg"/>;
		return(
			<section id="wrapper">
			  <div className="card" onClick={this.flip}>
			      <div className="face side1">
			        { this.state.points > 0 ? this.state.points : content }
			      </div>
			      <div className="face side2">
			        { back }
			      </div>
			  </div>
			</section>
		);
	}
})

module.exports = Cell;
