(function () {
	'use strict';
	var React = require('react/addons');
	var mui = require('material-ui');
	var ThemeManager = new mui.Styles.ThemeManager();
	var FlatButton = mui.FlatButton;
	var AppBar = mui.AppBar;
	var Paper = mui.Paper;
	var Dialog = mui.Dialog;
	var MineField = require('./MineField.js');
	// CSS
	require('normalize.css');
	require('../styles/main.css');

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
			return {
				isLost: false,
				displayDialog: false
			};
		},

		lost: function(){
			this.setState({isLost: true, displayDialog: true});
		},

		generateField: function(rows, cols, bombs){
			return _.shuffle(_.fill( _.fill(new Array(rows * cols), 0), 1, 0, bombs));
		},

		hideDialog: function () {
			this.setState({ displayDialog: false});
		},

		createEasyField: function(){
			this.setState({ isLost: false, displayDialog: false, mineField: new Date().getTime(), field: this.generateField(9, 9, 10), rows: 9, cols: 9 });
		},

		createMediumField: function(){
			this.setState({ isLost: false, displayDialog: false, mineField: new Date().getTime(), field: this.generateField(16, 16, 40), rows: 16, cols: 16 });
		},

		createHardField: function(){
			this.setState({ isLost: false, displayDialog: false, mineField: new Date().getTime(), field: this.generateField(16, 30, 99), rows: 16, cols: 30 });
		},

		render: function() {
			var standardActions = [
				{ text: 'No', onClick: this.hideDialog },
				{ text: 'Yes', onClick: this.createEasyField, ref: 'submit' }
			];
			return (
				<div className='main'>
					<AppBar title='Title' style={{visibility: 'hidden'}} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
					<Paper zDepth={1}>
						{ this.state.isLost && this.state.displayDialog ?
              <Dialog
								key={this.state.mineField}
								title="Boom!!!"
                actions={standardActions}
                actionFocus="submit"
								openImmediately={true}
                modal={true}>
                Retry ?
              </Dialog> : ''}
						<FlatButton onClick={this.createEasyField} label="Easy" secondary={true} />
						<FlatButton onClick={this.createMediumField} label="Medium" secondary={true} />
						<FlatButton onClick={this.createHardField} label="Hard" secondary={true} />
					</Paper>
					<MineField key={this.state.mineField} field={this.state.field} rows={this.state.rows} onLost={this.lost} cols={this.state.cols}/>
				</div>
			);
		}
	});

	WinemineApp.childContextTypes = { muiTheme: React.PropTypes.object };

	React.render(<WinemineApp />, document.getElementById('content'));

	module.exports = WinemineApp;
}());
