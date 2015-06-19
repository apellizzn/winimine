'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;
var AppBar = mui.AppBar;
var Paper = mui.Paper;
var TextField = mui.TextField;
var MineField = require('./MineField.jsx');
// CSS
require('normalize.css');
require('../styles/main.css');

var imageURL = require('../images/yeoman.png');

var WinemineApp = React.createClass({
	getChildContext() { 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function(){
  	return {
  		rows: 0, collumns: 0, bombs: 0
  	};
  },


  createMineField: function(){
  	var rows = $('input[name=rows]').val();
  	var collumns = $('input[name=collumns]').val();
  	var bombs = $('input[name=bombs]').val();
  	this.setState({ rows: rows, collumns: collumns, bombs: bombs })
  },

  render: function() {
    return (
      <div className='main'>
        <AppBar title='Title' style={{visibility: 'hidden'}} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <Paper zDepth={1}>
  				<TextField name="collumns" hintText="Collumns" value="3" style={{visibility: 'block'}}/>
  				<TextField name="rows" hintText="Rows" value="3" style={{visibility: 'block'}} />
  				<TextField name="bombs" hintText="Bombs" value="2" style={{visibility: 'block'}}/>
  				<FlatButton onClick={this.createMineField} label="Play" secondary={true} />
        </Paper>
  			<MineField rows={this.state.rows} collumns={this.state.collumns} bombs={this.state.bombs}/>
      </div>
    );
  }
});

WinemineApp.childContextTypes = { muiTheme: React.PropTypes.object };

React.render(<WinemineApp />, document.getElementById('content')); // jshint ignore:line

module.exports = WinemineApp;
