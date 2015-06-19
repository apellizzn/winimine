'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;
var AppBar = mui.AppBar;
var Paper = mui.Paper;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;
var Dialog = mui.Dialog;
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

  propTypes: {
    rows: React.PropTypes.number,
    collumns: React.PropTypes.number,
    bombs: React.PropTypes.number
  },

  getInitialState: function(){
    return { isLost: false };
  },

  getInitialProps: function(){
  	return {
  		rows: 0, collumns: 0, bombs: 0
  	};
  },

  lost: function(){
    this.setState({isLost: true});
  },

  createMineField: function(){
  	var rows = Number($('input[name=rows]').val());
  	var collumns = Number($('input[name=collumns]').val());
  	var bombs = Number($('input[name=bombs]').val());
  	this.setProps({ rows: rows, collumns: collumns, bombs: bombs })
  },

  render: function() {
    if(this.state.isLost){
      var customActions = [
        <FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={this._handleCustomDialogCancel} />,
        <FlatButton
          label="Submit"
          primary={true}
          onTouchTap={this._handleCustomDialogSubmit} />
      ];
      return(
        <Dialog
          title="Dialog With Custom Actions"
          actions={customActions}
          modal={true}>
          The actions in this window were passed in as an array of react objects.
        </Dialog>
      );
    } else {
      return (
        <div className='main'>
          <AppBar title='Title' style={{visibility: 'hidden'}} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
          <Paper zDepth={1}>
    				<TextField name="collumns" hintText="Collumns" value="3" style={{visibility: 'block'}}/>
    				<TextField name="rows" hintText="Rows" value="3" style={{visibility: 'block'}} />
    				<TextField name="bombs" hintText="Bombs" value="2" style={{visibility: 'block'}}/>
    				<FlatButton onClick={this.createMineField} label="Play" secondary={true} />
          </Paper>
    			<MineField onLost={this.lost} rows={this.props.rows} collumns={this.props.collumns} bombs={this.props.bombs}/>
        </div>
      );
    }
  }
});

WinemineApp.childContextTypes = { muiTheme: React.PropTypes.object };

React.render(<WinemineApp />, document.getElementById('content')); // jshint ignore:line

module.exports = WinemineApp;
