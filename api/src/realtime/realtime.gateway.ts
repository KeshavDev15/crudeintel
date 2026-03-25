import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL ?? 'http://localhost:3000' },
})
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RealtimeGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  emitPriceUpdate(prices: any[]) {
    this.server.emit('priceUpdate', { prices, timestamp: new Date() });
  }

  emitArbitrageAlert(opportunity: any) {
    this.server.emit('arbitrageAlert', opportunity);
  }

  emitConnectedClients() {
    return this.server.sockets.sockets.size;
  }
}
