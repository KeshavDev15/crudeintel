import { Module } from '@nestjs/common';
import { EiaService } from './eia.service';
import { AlphaVantageService } from './alphavantage.service';
import { YahooService } from './yahoo.service';

@Module({
  providers: [EiaService, AlphaVantageService, YahooService],
  exports: [EiaService, AlphaVantageService, YahooService],
})
export class SourcesModule {}
