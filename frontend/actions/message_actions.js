const AppDispatcher = require('../dispatcher/dispatcher.js');
const MessageApiUtil = require('../util/message_api_util.js');
const MessageConstants = require('../constants/message_constants.js');

const MessageActions = {
  fetchMessages: function () {
    MessageApiUtil.fetchMessages(MessageActions.receiveMessages);
  },
  receiveMessages: function (messages) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.RECEIVE_MESSAGES,
      messages: messages
    });
  },
  createMessage: function (message) {
    MessageApiUtil.createMessage(message, MessageActions.messageCreated);
  },
  messageCreated: function (message) {
    console.log('message created');
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_CREATED,
      message: message
    });
  }
};

module.exports = MessageActions;
