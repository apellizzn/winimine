"user strict;"

var React = require('react/addons');

require('styles/Cell.css');

var Cell = React.createClass({

	flip: function(event){
		var angle = 0;
    angle += 180;
    var element = $(event.currentTarget); 
    element.css('webkitTransition', '-webkit-transform 1.0s cubic-bezier(0,.75,.25,1)');
    element.css('webkitTransform', 'rotateY(' + angle + 'deg)');
  },

	render: function () {
		return(
			<section id="wrapper">
			  <div className="card" onClick={this.flip}>
			      <div className="face side1">
			        <img className="retro" src="https://d13yacurqjgara.cloudfront.net/users/149082/screenshots/1041104/bomb-explosion.gif"/>
			      </div>
			      <div className="face side2">
			          <img className="retro" src="https://d13yacurqjgara.cloudfront.net/users/149082/screenshots/1041104/bomb-explosion.gif"/>
			      </div>
			  </div>
			</section>
		);
	}
})

module.exports = Cell;
