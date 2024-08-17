import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) { }

	private testUserId = ""

	@Get()
	getArticles() {
		return this.articlesService.findAll()
	}

	@Get(':id')
	getArticle(@Param('id') id: string) {
		return this.articlesService.findByID(id)
	}

	@Post()
	createArticle(@Body() createArticleDto: CreateArticleDto) {
		return this.articlesService.create(createArticleDto, this.testUserId)
	}

	@Patch(':id/publish')
	publishArticleDraft(@Param('id') id: string) {
		return this.articlesService.update(id, { published: true })
	}

	@Put(':id')
	updateArticle(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
		return this.articlesService.update(id, updateArticleDto)
	}

	@Delete(':id')
	@HttpCode(204)
	deleteArticle(@Param('id') id: string) {
		return this.articlesService.delete(id)
	}
}
