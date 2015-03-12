var React = require('react');
var Art = require('react-art');

var Shape = Art.Shape;
var Path = Art.Path;

function makeHexPath(size, centre) {
	var path = new Path();
	var point = 0;
	var angle = null;
	var x = null;
	var y = null;

	while (point < 6) {
		angle = 2 * Math.PI / 6 * (point + 0.5);
		x = centre.x + size * Math.cos(angle);
		y = centre.y + size * Math.sin(angle);

		if (point === 0) {
			path.moveTo(x, y);
		}
		else {
			path.lineTo(x, y);
		}

		point = point + 1;
	}

	return path;
}

module.exports = React.createClass({
	getInitialState: function() {
		return {
			isSelected: false
		};
	},
	onClick: function() {
		this.setState({
			isSelected: !this.state.isSelected
		});
	},
	render: function() {
		var color = this.state.isSelected ? '#888' : '#111';

		// TODO - this could be optimised, don't need to calculate coords for every hex, just one and then offset.
		var path = makeHexPath(this.props.size, this.props.centre);
		
		return (
			<Shape d={path} fill={color} opacity='0.5' onClick={this.onClick}></Shape>
		);
	}
});