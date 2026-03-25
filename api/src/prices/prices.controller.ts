import { Controller, Get, Param, Query } from '@nestjs/common';
import { PricesService } from './prices.service';

@Controller('prices')
export class PricesController {
  constructor(private readonly prices: PricesService) {}

  // GET /prices — all current prices
  @Get()
  getAll() {
    return this.prices.getAllCached();
  }

  // GET /prices/WTI — single benchmark
  @Get(':benchmark')
  getOne(@Param('benchmark') benchmark: string) {
    return this.prices.getCached(benchmark.toUpperCase());
  }

  // GET /prices/WTI/history?days=30
  @Get(':benchmark/history')
  getHistory(
    @Param('benchmark') benchmark: string,
    @Query('days') days?: string,
  ) {
    return this.prices.getHistoryGroupedByDay(
      benchmark.toUpperCase(),
      days ? parseInt(days) : 30,
    );
  }

  // GET /prices/refresh/all — manually trigger refresh
  @Get('refresh/all')
  refresh() {
    return this.prices.fetchAllPrices();
  }
}
