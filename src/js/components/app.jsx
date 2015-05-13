var App = function(React, GameBoard, PureRenderMixin) {
	return React.createClass({
		displayName: 'app',
		mixins: [PureRenderMixin],
		render: function() {
			return (
				<GameBoard />
			);
		}
	});
}

App.$inject = ['React', 'GameBoard', 'PureRenderMixin'];
module.exports = App;