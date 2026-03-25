import { Module } from '@nestjs/common';
import { ArbitrageService } from './arbitrage.service';
import { ArbitrageController } from './arbitrage.controller';
import { PricesModule } from '../prices/prices.module';

@Module({
  imports: [PricesModule],
  controllers: [ArbitrageController],
  providers: [ArbitrageService],
  exports: [ArbitrageService],
})
export class ArbitrageModule {}
