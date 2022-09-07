import socketio from 'socket.io';
import debug from 'debug';
import messageService from '../../components/message/services/message.service';
import userService from '../../components/user/services/user.service';
import { IMessage } from '../../common/types/message.interface';
import { NotFoundError } from '../../common/error/not.found.error';
import BaseError from '../../common/error/base.error';

const log: debug.IDebugger = debug('app:socket-io');

export default class SocketServer {
  private readonly server: socketio.Server;
  private readonly socket: socketio.Socket;

  constructor(server: socketio.Server, socket: socketio.Socket) {
    this.server = server;
    this.socket = socket;

    socket.on('new message', (message) => this.newMessage(message));
    socket.on('get messages', (userEmail) => this.getMessages(userEmail));

    log('Started socket-io service');
  }

  // TODO newMessage and getMessages are very similar methods, redundancies must be eliminated.

  public async newMessage(message: IMessage): Promise<void> {
    try {
      const user = await userService.getUserByEmail(message.email);
      if (!user) {
        throw new NotFoundError('User email not found', 'newMessage');
      }
      // @ts-ignore
      await messageService.create({
        user: user._id,
        text: message.text,
        type: 'user',
      });

      const messagesList = await messageService.listUserMessages(user._id);
      this.socket.emit('new message saved', messagesList);
    } catch (err) {
      const message = err instanceof BaseError ? err.message : err;
      this.socket.emit('messages error', { message });
    }
  }

  public async getMessages(userEmail: string): Promise<void> {
    try {
      const user = await userService.getUserByEmail(userEmail);
      if (!user) {
        throw new NotFoundError('User email not found', 'getMessages');
      }
      const messagesList = await messageService.listUserMessages(user._id);
      this.socket.emit('messages', messagesList);
    } catch (err) {
      const message = err instanceof BaseError ? err.message : err;
      this.socket.emit('messages error', { message });
    }
  }
}
