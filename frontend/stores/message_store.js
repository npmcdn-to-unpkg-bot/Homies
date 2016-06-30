const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const MessageStore = new Store(AppDispatcher);
const MessageConstants = require('../constants/message_constants.js');


let _messages = {};

MessageStore.all = function () {
  return _messages;
};

function allMessages (messages) {
  const messageKeys = Object.keys(messages);
  for (let i = 0; i < messageKeys.length; i++) {
    _messages[messages[messageKeys[i]].id] = messages[messageKeys[i]];
  }
}

function addMessage (message) {
  _messages[message.id] = message;
}

MessageStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case MessageConstants.RECEIVE_MESSAGES:
      allMessages(payload.messages);
      MessageStore.__emitChange();
      break;
    case MessageConstants.MESSAGE_CREATED:
      addMessage(payload.message);
      MessageStore.__emitChange();
      break;
  }
};

module.exports = MessageStore;
