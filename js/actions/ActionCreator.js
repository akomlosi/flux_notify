var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {
	createEvent : function(eventType, eventData) {
		AppDispatcher.dispatch({
			action : {
				type : 'CREATE_EVENT',
				content : {
					eventType : eventType,
					eventData : eventData
				}
			}
		});
	}
};