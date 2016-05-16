var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _events = {}; // collection of events

/**
 * Create an Event.
 * @param {object} content The content of the event
 */
function create(content) {
	// Using the current timestamp in place of a real id.
	var id = Date.now();
	_events[id] = {
		id: id,
		eventType : content.eventType,
		eventData : content.eventData
	};
}

/**
 * Delete an event from the list.
 * @param {string} id
 */
function destroy(id) {
	delete _events[id];
}

var AppStore = assign({}, EventEmitter.prototype, {

	/**
	 * Get the entire collection of TODOs.
	 * @return {object}
	 */
	getAll: function() {
		return _events;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * @param {function} callback
	 */
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * @param {function} callback
	 */
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	dispatcherIndex: AppDispatcher.register(function(payload) {
		var action = payload.action;
		var content;

		switch(action.type) {
			case 'CREATE_EVENT':
				content = action.content;
				if (content) {
					create(content);
					AppStore.emitChange();
				}
				else {
					console.error('No content provided');
				}
				break;

			//case CONST.REMOVE_EVENT:
			//	destroy(action.id);
			//	AppStore.emitChange();
			//	break;
		}

		return true; // No errors. Needed by promise in Dispatcher.
	})

});

module.exports = AppStore;