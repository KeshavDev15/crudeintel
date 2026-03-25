import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly news: NewsService) {}

  @Get()
  getNews(@Query('limit') limit?: string) {
    return this.news.getLatestNews(limit ? parseInt(limit) : 10);
  }

  @Get('refresh')
  refresh() {
    return this.news.fetchNews();
  }
}
