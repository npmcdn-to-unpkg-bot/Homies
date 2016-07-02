const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const MessageStore = new Store(AppDispatcher);
const MessageConstants = require('../constants/message_constants.js');


let _messages = {};

MessageStore.all = function () {
  return _messages;
};

MessageStore.getLast = function (amountOfMessages) {
  const messageKeys = Object.keys(_messages);
  const sortedMessageKeys = messageKeys.sort(function (a, b) {
    return a - b;
  });
  const requestedMessageIds = messageKeys.reverse().slice(0, amountOfMessages);
  const requestedMessages = [];
  requestedMessageIds.forEach(id => {
    requestedMessages.push(_messages[id]);
  });
  return requestedMessages;
};

function sortNumber (a, b) {
  return a - b;
}

function allMessages (messages) {
  const messageKeys = Object.keys(messages);
  for (let i = 0; i < messageKeys.length; i++) {
    _messages[messages[messageKeys[i]].id] = messages[messageKeys[i]];
  }
  MessageStore.__emitChange();
}

function addMessage (message) {
  _messages[message.id] = message;
  MessageStore.__emitChange();
}

MessageStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case MessageConstants.RECEIVE_MESSAGES:
      allMessages(payload.messages);
      break;
    case MessageConstants.MESSAGE_CREATED:
      addMessage(payload.message);
      break;
  }
};

module.exports = MessageStore;
