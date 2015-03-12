var Events = require('events');
var _ = require('underscore');

var eventEmitter = new Events.EventEmitter();

function onResize() {
	eventEmitter.emit('resize', {
		width: window.innerWidth,
		height: window.innerHeight
	});
}
window.addEventListener('resize', _.debounce(onResize, 200));

module.exports = {
	subscribeResize: function(onResize) {
		eventEmitter.addListener('resize', onResize);
	},
	unsubscribeResize: function(onResize) {
		eventEmitter.removeListener('resize', onResize);
	},
	getDimensions: function() {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}
};