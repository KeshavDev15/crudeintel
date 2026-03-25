import { Controller, Get, Param } from '@nestjs/common';
import { PredictionService } from './prediction.service';

@Controller('predictions')
export class PredictionController {
  constructor(private readonly prediction: PredictionService) {}

  // GET /predictions — all benchmarks
  @Get()
  getAll() {
    return this.prediction.getAllPredictions();
  }

  // GET /predictions/WTI
  @Get(':benchmark')
  getOne(@Param('benchmark') benchmark: string) {
    return this.prediction.getPrediction(benchmark.toUpperCase());
  }

  // GET /predictions/WTI/history
  @Get(':benchmark/history')
  getHistory(@Param('benchmark') benchmark: string) {
    return this.prediction.getPredictionHistory(benchmark.toUpperCase());
  }
}
