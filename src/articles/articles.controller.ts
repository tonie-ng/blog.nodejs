import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

	@Get()
	getArticles(@Query() query) {
		return "Hello there"
	}
}
