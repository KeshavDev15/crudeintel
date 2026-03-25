import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PricesModule } from '../prices/prices.module';
import { NewsModule } from '../news/news.module';

@Module({
  imports: [PricesModule, NewsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
