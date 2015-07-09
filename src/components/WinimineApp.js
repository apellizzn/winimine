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

	var WinimineApp = React.createClass({
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
				isLost: false
			};
		},

		lost: function(){
			this.setState({isLost: true});
			this.refs.dialog.show();
		},

		generateField: function(rows, cols, bombs){
			return _.shuffle(_.fill( _.fill(new Array(rows * cols), 0), 1, 0, bombs));
		},

		createEasyField: function(){
			this.setState({ isLost: false, mineField: new Date().getTime(), field: this.generateField(9, 9, 10), rows: 9, cols: 9 });
		},

		createMediumField: function(){
			this.setState({ isLost: false, mineField: new Date().getTime(), field: this.generateField(16, 16, 40), rows: 16, cols: 16 });
		},

		dismissDialog: function () {
			this.refs.dialog.dismiss();
		},

		modalActions: function () {
			return [
				{ text: 'No', onClick: this.dismissDialog },
				{ text: 'Yes', onClick: this.createEasyField, ref: 'submit' }
			];
		},

		author: function () {
			return (
				<span class="author">
						by <a href="http://www.github.com/apellizzn">@apellizzn</a>
				</span>
			);
		},

		dialog: function () {
			return (
				<Dialog
					ref="dialog"
					key={this.state.mineField}
					title="Boom!!!"
					actions={this.modalActions()}
					actionFocus="submit"
					modal={true}>
					Retry ?
				</Dialog>
			);
		},

		createHardField: function(){
			this.setState({ isLost: false, displayDialog: false, mineField: new Date().getTime(), field: this.generateField(16, 30, 99), rows: 16, cols: 30 });
		},

		render: function() {
			return (
				<div className='main'>
					<AppBar
						title={ <h2>Winimine { this.author() }</h2> }
						style={{ display: 'table' }}
						iconClassNameRight="muidocs-icon-navigation-expand-more"
						showMenuIconButton={false}
					/>
					<Paper zDepth={1}>
						{ this.dialog() }
						<FlatButton onClick={this.createEasyField} label="Easy" secondary={true} />
						<FlatButton onClick={this.createMediumField} label="Medium" secondary={true} />
						<FlatButton onClick={this.createHardField} label="Hard" secondary={true} />
					</Paper>
					<MineField key={this.state.mineField} field={this.state.field} rows={this.state.rows} onLost={this.lost} cols={this.state.cols}/>
				</div>
			);
		}
	});

	WinimineApp.childContextTypes = { muiTheme: React.PropTypes.object };

	React.render(<WinimineApp />, document.getElementById('content'));

	module.exports = WinimineApp;
}());
