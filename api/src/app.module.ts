import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { SourcesModule } from './sources/sources.module';
import { PricesModule } from './prices/prices.module';
import { ArbitrageModule } from './arbitrage/arbitrage.module';
import { NewsModule } from './news/news.module';
import { PredictionModule } from './prediction/prediction.module';
import { RealtimeModule } from './realtime/realtime.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    SourcesModule,
    PricesModule,
    ArbitrageModule,
    NewsModule,
    PredictionModule,
    RealtimeModule,
    SchedulerModule,
    ChatModule,
  ],
})
export class AppModule {}
