var React = require('react');
var Art = require('react-art');
var HexGrid = require('./hex-grid.jsx');
var Display = require('../utilities/display.js');

var Surface = Art.Surface;

module.exports = React.createClass({
	getInitialState: function() {
		return {
			displayDimensions: Display.getDimensions()
		}
	},
	setDisplayDimensions: function(dimensions) {
		this.setState({
			displayDimensions: Display.getDimensions()
		});
	},
	componentWillMount: function() {
		Display.subscribeResize(this.setDisplayDimensions);
	},
	componentWillUnmount: function() {
		Display.unsubscribeResize(this.setDisplayDimensions);
	},
	render: function() {
		var width = this.state.displayDimensions.width;
		var height = this.state.displayDimensions.height;

		return (
			<Surface width={ width } height={ height }>
				<HexGrid width={ width } height={ height } hexCountHorizontal='19' hexCountVertical='13' />
			</Surface>
		);
	}
})