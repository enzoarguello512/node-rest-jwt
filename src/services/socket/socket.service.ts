import socketio from 'socket.io';
import debug from 'debug';
import messageService from '../../components/message/services/message.service';
import BaseError from '../../common/error/base.error';
import { ICreateMessageDto } from '../../components/message/dto/create.message.dto';

const log: debug.IDebugger = debug('app:socket-io');

export default class SocketServer {
  private readonly server: socketio.Server;
  private readonly socket: socketio.Socket;
  constructor(server: socketio.Server, socket: socketio.Socket) {
    this.server = server;
    this.socket = socket;

    // Event handlers
    socket.on('new message', (userId: string, messageText: string) =>
      this.newMessage(userId, messageText)
    );
    socket.on('get messages', (userId: string) => this.getMessages(userId));

    log('Started socket-io service');
  }

  // TODO newMessage and getMessages are very similar methods, redundancies must be eliminated.

  // Method responsible for saving messages in the database
  public async newMessage(userId: string, messageText: string): Promise<void> {
    try {
      let userMessage: ICreateMessageDto;

      if (messageText !== 'welcomeMessage') {
        userMessage = (await messageService.create({
          // @ts-expect-error
          user: userId,
          text: messageText,
          type: 'user',
        })) as ICreateMessageDto;
      }

      const systemResponse = await messageService.generateSystemMessage(
        userId,
        messageText
      );

      const serverMessage = (await messageService.create({
        // @ts-expect-error
        user: userId,
        text: systemResponse,
        type: 'server',
      })) as ICreateMessageDto;

      if (messageText === 'welcomeMessage') {
        this.socket.emit('new message saved', serverMessage);
        return;
      }

      // @ts-expect-error
      this.socket.emit('new message saved', [userMessage, serverMessage]);
    } catch (err) {
      const message = err instanceof BaseError ? err.message : err;
      this.socket.emit('messages error', { message });
    }
  }
  // Method responsible for retrieving messages from a specific user
  public async getMessages(userId: string): Promise<void> {
    try {
      const messagesList = await messageService.listUserItemsCollection(userId);
      this.socket.emit('messages', messagesList);
    } catch (err) {
      const message = err instanceof BaseError ? err.message : err;
      this.socket.emit('messages error', { message });
    }
  }
}
