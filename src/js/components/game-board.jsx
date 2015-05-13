var GameBoard = function(React, Surface, HexGrid, PureRenderMixin, displayHelper) {
	return React.createClass({
		displayName: 'GameBoard',
		mixins: [PureRenderMixin],
		getInitialState: function() {
			return {
				displayDimensions: displayHelper.getDimensions()
			}
		},
		setDisplayDimensions: function(dimensions) {
			this.setState({
				displayDimensions: displayHelper.getDimensions()
			});
		},
		componentWillMount: function() {
			displayHelper.subscribeResize(this.setDisplayDimensions);
		},
		componentWillUnmount: function() {
			displayHelper.unsubscribeResize(this.setDisplayDimensions);
		},
		render: function() {
			var width = this.state.displayDimensions.width;
			var height = this.state.displayDimensions.height;

			return (
				<Surface width={ width } height={ height }>
					<HexGrid width={ width } height={ height } hexCountHorizontal='25' hexCountVertical='13' />
				</Surface>
			);
		}
	});
};

GameBoard.$inject = ['React', 'Surface', 'HexGrid', 'PureRenderMixin', 'displayHelper'];
module.exports = GameBoard;