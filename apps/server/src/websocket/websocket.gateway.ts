import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // 允许的前端地址，这里要注意配置跨域问题
  },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  currentUsers = 0;

  // 当 WebSocket Gateway 初始化完成时，我们向所有客户端广播当前的用户人数。
  afterInit() {
    this.server.emit('usersCount', this.currentUsers);
  }

  // 当有新的 WebSocket 连接时，我们增加当前用户人数并广播更新。
  handleConnection() {
    this.incrementUsersCount();
    this.server.emit('usersCount', this.currentUsers);
  }

  // 当 WebSocket 连接断开时，我们减少当前用户人数并广播更新。
  handleDisconnect() {
    this.decrementUsersCount();
    this.server.emit('usersCount', this.currentUsers);
  }

  incrementUsersCount() {
    this.currentUsers++;
  }

  decrementUsersCount() {
    this.currentUsers--;
  }
}
