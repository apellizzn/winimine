"user strict;"

var React = require('react/addons');

require('styles/Cell.css');

var Cell = React.createClass({

	propTypes: {
		onLost: React.PropTypes.func,
		isBomb: React.PropTypes.bool
	},

	flip: function(event){
		var angle = 0;
    angle += 180;
    var element = $(event.currentTarget); 
    element.css('webkitTransition', '-webkit-transform 1.0s cubic-bezier(0,.75,.25,1)');
    element.css('webkitTransform', 'rotateY(' + angle + 'deg)');
    if(this.props.isBomb){ this.props.onLost(); }
  },

	render: function () {
		var content = this.props.isBomb ? 
			<img className="retro" src="https://d13yacurqjgara.cloudfront.net/users/149082/screenshots/1041104/bomb-explosion.gif"/> 
			: <img className="retro" src="https://d13yacurqjgara.cloudfront.net/users/799725/screenshots/2113098/___1x.jpg"/>;
		return(
			<section id="wrapper">
			  <div className="card" onClick={this.flip}>
			      <div className="face side1">
			        { content }
			      </div>
			      <div className="face side2">
			        { content }
			      </div>
			  </div>
			</section>
		);
	}
})

module.exports = Cell;
