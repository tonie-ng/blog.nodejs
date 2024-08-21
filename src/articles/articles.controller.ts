import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { IsPublic } from '@src/auth/auth.decorator';
import { CustomRequest } from '@src/auth/auth.guard';


@ApiTags('articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) { }

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
	createArticle(@Body() createArticleDto: CreateArticleDto, @Req() req: CustomRequest) {
		return this.articlesService.create(createArticleDto, req.user.sub)
	}

	@Patch(':id/publish')
	publishArticleDraft(@Param('id') id: string, @Req() req: CustomRequest) {
		return this.articlesService.update(id, req.user.sub, { published: true })
	}

	@Put(':id')
	updateArticle(@Param('id') id: string,@Req() req: CustomRequest, @Body() updateArticleDto: UpdateArticleDto) {
		return this.articlesService.update(id, req.user.sub, updateArticleDto)
	}

	@Delete(':id')
	@HttpCode(204)
	deleteArticle(@Param('id') id: string, @Req() req: CustomRequest) {
		return this.articlesService.delete(id, req.user.sub)
	}
}
