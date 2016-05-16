var $ = require('jquery');
var ActionCreator = require('../app').ActionCreator;
var AppStore = require('../app').AppStore;
var assign = require('object-assign');

var AppView = function(){
	this.init();
};
AppView.prototype =  assign({}, AppView.prototype, {
	init : function() {
		var self = this;
		$('#event_fav').click(function() {
			self._createEvent('favorite');
		});
		$('#event_msg').click(function() {
			self._createEvent('message');
		});
		$('#event_new_content').click(function() {
			self._createEvent('new_content');
		});

		AppStore.addChangeListener(this.onChange);
	},

	_createEvent : function(eventName){
		if ($.trim($('#name').val()) == '') {
			return;
		}
		ActionCreator.createEvent(eventName, {name : $('#name').val()});
	},

	onChange : function() {
		var eventList = AppStore.getAll(), e, event;
		$('#event_list').html('');
		for (e in eventList) {
			event = eventList[e];
			switch(event.eventType) {
				case 'favorite' :
					$('#event_list').append(
						'<li class="list-group-item">' + event.eventData.name + ' has come online.</li>'
					);
					break;
				case 'message' :
					$('#event_list').append(
						'<li class="list-group-item">' + event.eventData.name + ' has sent a new message for you.</li>'
					);
					break;
				case 'new_content' :
					$('#event_list').append(
						'<li class="list-group-item">' + event.eventData.name + ' has uploaded a new content.</li>'
					);
					break;
				default:
					break
			}
		}
	}
});

module.exports = AppView;