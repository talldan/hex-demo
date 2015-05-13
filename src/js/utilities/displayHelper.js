var displayHelper = function(_, eventEmitter) {
	
	function onResize() {
		eventEmitter.emit('resize', {
			width: window.innerWidth,
			height: window.innerHeight
		});
	}
	window.addEventListener('resize', _.debounce(onResize, 200));

	return {
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
			};
		}
	};
};

displayHelper.$inject = ['_', 'eventEmitter']
module.exports = displayHelper;