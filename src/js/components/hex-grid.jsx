var HexGrid = function(_, React, Group, HexTile, PureRenderMixin) {

	var SIZE_TO_PACKED_WIDTH = 1.7320508075688772;
	var SIZE_TO_PACKED_HEIGHT = 1.5;

	function getOptimalSize(widthPixels, heightPixels, countHorizontal, countVertical) {
		// add extra amounts for offset rows and bottom points of hexes on last row
		var packedhexWidth = widthPixels / (parseInt(countHorizontal, 10) + 0.5);
		var adjustedGridHeight = (heightPixels * SIZE_TO_PACKED_HEIGHT) / (parseInt(countVertical, 10) + 0.5);
		var packedHexHeight =  adjustedGridHeight / SIZE_TO_PACKED_HEIGHT;

		var size = null;

		if ((packedhexWidth / SIZE_TO_PACKED_WIDTH) < (packedHexHeight / SIZE_TO_PACKED_HEIGHT)) {
			size = packedhexWidth / SIZE_TO_PACKED_WIDTH;
		}
		else {
			size = packedHexHeight / SIZE_TO_PACKED_HEIGHT;
		}

		return size.toFixed(8);
	}

	function calculatePixelCoordinates(baseVector, hexSize, axialXCoord, axialYCoord) {
		return {
			x: baseVector.x + (hexSize * Math.sqrt(3) * (axialXCoord + axialYCoord / 2)),
			y: baseVector.y + (hexSize * 3 / 2 * axialYCoord)
		};
	}

	function setupHexPositionsRadial(widthPixels, heightPixels, countHorizontal, countVertical) {
		var size = getOptimalSize(
				widthPixels, 
				heightPixels, 
				countHorizontal,
				countVertical
		);

		var centreX = Math.floor(widthPixels / 2);
		var centreY = Math.floor(heightPixels / 2);
		var gridRadiusVertical = (countVertical - 1) / 2;
		var centreVector = {
			x: Math.floor(widthPixels / 2),
			y: Math.floor(heightPixels / 2)
		};
		var hexSize = parseFloat(size, 10);
		var widthOffset = (countHorizontal - countVertical) / 2;

		var rows = [];
		_.times(countVertical, function(indexVertical) {
			var axialYCoord = indexVertical - gridRadiusVertical;
			var distanceFromCentreVertical = Math.abs(axialYCoord);
			var adjustedCountHorizontal = countHorizontal - distanceFromCentreVertical;

			var row = [];

			_.times(adjustedCountHorizontal, function(indexHorizontal) {
				var axialXCoord = indexHorizontal - Math.min(indexVertical, gridRadiusVertical) - widthOffset;
				var cubeXCoord = 0;
				var cubeYCoord = 0;

				row.push({
					keyName: 'tile_' + axialXCoord + '_' + axialYCoord,
					axialCoordinates: {
						x: axialXCoord,
						y: axialYCoord 
					},
					cubeCoordinates: {
						x: axialXCoord,
						y: (-axialXCoord) - axialYCoord,
						z: axialYCoord
					},
					size: hexSize - 0.4,
					pixelCoordinates: calculatePixelCoordinates(centreVector, hexSize, axialXCoord, axialYCoord)
				});
			});

			rows.push(row);
		});

		return rows;
	}

	return React.createClass({
		displayName: 'HexGrid',
		mixins: [PureRenderMixin],
		render: function() {
			var widthPixels = this.props.width;
			var heightPixels = this.props.height;
			var hexCountHorizontal = this.props.hexCountHorizontal;
			var hexCountVertical = this.props.hexCountVertical;

			var hexPositions = setupHexPositionsRadial(
					widthPixels, 
					heightPixels, 
					hexCountHorizontal, 
					hexCountVertical
			);

			var hexGrid = _.map(hexPositions, function(hexRow, index) {
				var rowElements = _.map(hexRow, function(hexData) {
					var hexKey = hexData.keyName;
					return (
						<HexTile key={ hexKey } size={hexData.size} centre={hexData.pixelCoordinates}></HexTile>
					);
				});

				return (
					<Group key={ 'row_' + index }>
						{ rowElements }
					</Group>
				);
			});

			return (
				<Group>
					{ hexGrid }
				</Group>
			);
		}
	});
};

HexGrid.$inject = ['_', 'React', 'Group', 'HexTile', 'PureRenderMixin'];
module.exports = HexGrid;