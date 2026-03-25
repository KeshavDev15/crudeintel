import { Controller, Get, Query } from '@nestjs/common';
import { ArbitrageService } from './arbitrage.service';

@Controller('arbitrage')
export class ArbitrageController {
  constructor(private readonly arb: ArbitrageService) {}

  // GET /arbitrage — all current opportunities
  @Get()
  getAll() {
    return this.arb.detectOpportunities();
  }

  // GET /arbitrage/best?n=3
  @Get('best')
  getBest(@Query('n') n?: string) {
    return this.arb.getBestOpportunities(n ? parseInt(n) : 3);
  }

  // GET /arbitrage/history
  @Get('history')
  getHistory(@Query('limit') limit?: string) {
    return this.arb.getHistory(limit ? parseInt(limit) : 50);
  }

  // GET /arbitrage/spread?b1=WTI&b2=BRENT&days=30
  @Get('spread')
  getSpread(
    @Query('b1') b1: string,
    @Query('b2') b2: string,
    @Query('days') days?: string,
  ) {
    return this.arb.getSpreadHistory(b1, b2, days ? parseInt(days) : 30);
  }
}
