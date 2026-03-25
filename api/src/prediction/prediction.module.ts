import { Module } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { PredictionController } from './prediction.controller';
import { PricesModule } from '../prices/prices.module';
import { NewsModule } from '../news/news.module';

@Module({
  imports: [PricesModule, NewsModule],
  controllers: [PredictionController],
  providers: [PredictionService],
  exports: [PredictionService],
})
export class PredictionModule {}
