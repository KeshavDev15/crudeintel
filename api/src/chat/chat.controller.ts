import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async chat(@Body() body: { message: string }) {
    const response = await this.chatService.chat(body.message);
    return { response };
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'CrudeIntel Chat Bot' };
  }
}
