var ReactArt = require('react-art');
var React = require('react/addons');
var Events = require('events');
var indejection = require('indejection');
var container = indejection();

// libs
container
	.register('React', React, { maker: 'fixed' })
	.register('_', require('lodash'), { maker: 'fixed' })
	.register('rsvp', require('rsvp'), { maker: 'fixed' })
	.register('eventEmitter', function() { return new Events.EventEmitter() })
	.register('seedrandom', require('seedrandom'), { maker: 'fixed' })
	.register('displayHelper', require('./utilities/displayHelper'), { maker: 'singleton' });

// components
container
	.register('Surface', ReactArt.Surface, { maker : 'fixed' })
	.register('Group', ReactArt.Group, { maker : 'fixed' })
	.register('Path', ReactArt.Path, { maker : 'fixed' })
	.register('Shape', ReactArt.Shape, { maker : 'fixed' })
	.register('App', require('./components/app.jsx'))
	.register('GameBoard', require('./components/game-board.jsx'))
	.register('HexGrid', require('./components/hex-grid.jsx'))
	.register('HexTile', require('./components/hex-tile.jsx'));

// mixins
container
	.register('PureRenderMixin', React.addons.PureRenderMixin, { maker: 'fixed' });

var React = container.get('React');
var AppElement = React.createElement(container.get('App'));
React.render(AppElement, document.body);