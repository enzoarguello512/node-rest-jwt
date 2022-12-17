import createMessage from './createMessage';
import getMessageById from './getMessageById';
import listMessages from './listMessages';
import listUserMessages from './listUserMessages';
import patchMessage from './patchMessage';
import removeMessage from './removeMessage';

const messagesPaths = {
  '/messages': {
    ...listMessages,
    ...createMessage,
  },
  '/messages/{id}': {
    ...getMessageById,
    ...removeMessage,
    ...patchMessage,
  },
  '/messages/user/{userId}': {
    ...listUserMessages,
  },
};

export default messagesPaths;
