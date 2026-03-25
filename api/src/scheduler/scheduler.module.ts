import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { PricesModule } from '../prices/prices.module';
import { ArbitrageModule } from '../arbitrage/arbitrage.module';
import { NewsModule } from '../news/news.module';
import { RealtimeModule } from '../realtime/realtime.module';

@Module({
  imports: [PricesModule, ArbitrageModule, NewsModule, RealtimeModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
