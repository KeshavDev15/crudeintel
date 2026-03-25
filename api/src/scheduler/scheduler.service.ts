import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PricesService } from '../prices/prices.service';
import { ArbitrageService } from '../arbitrage/arbitrage.service';
import { NewsService } from '../news/news.service';
import { RealtimeGateway } from '../realtime/realtime.gateway';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private prices: PricesService,
    private arbitrage: ArbitrageService,
    private news: NewsService,
    private realtime: RealtimeGateway,
  ) {}

  // Fetch prices every 5 minutes
  @Cron(CronExpression.EVERY_5_MINUTES)
  async fetchPrices() {
    this.logger.log('Scheduled price fetch...');
    const prices = await this.prices.fetchAllPrices();
    this.realtime.emitPriceUpdate(prices);

    // Check arbitrage after price update
    const opportunities = this.arbitrage.getBestOpportunities(3);
    await this.arbitrage.saveOpportunities(opportunities);

    if (opportunities.length > 0 && opportunities[0].spread > 2.0) {
      this.realtime.emitArbitrageAlert(opportunities[0]);
    }
  }

  // Fetch news every 30 minutes
  @Cron(CronExpression.EVERY_30_MINUTES)
  async fetchNews() {
    this.logger.log('Scheduled news fetch...');
    await this.news.fetchNews();
  }
}
