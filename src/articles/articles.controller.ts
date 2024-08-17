import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { IsPublic } from '@src/auth/auth.decorator';


@ApiTags('articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) { }

	// Here because I'm yet to implement authentication
	// Ideally this will be extracted from the req object
	private testUserId = "clzym30kk0000aank5z6yxn98"

	@IsPublic()
	@Get()
	getArticles() {
		return this.articlesService.findAll()
	}

	@IsPublic()
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
