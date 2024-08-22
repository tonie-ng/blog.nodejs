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
	async createArticle(@Body() createArticleDto: CreateArticleDto, @Req() req: CustomRequest) {
		const r = await req.user;
		return this.articlesService.create(createArticleDto, r.sub)
	}

	@Patch(':id/publish')
	async publishArticleDraft(@Param('id') id: string, @Req() req: CustomRequest) {
		const r = await req.user;
		return this.articlesService.update(id, r.sub, { published: true })
	}

	@Put(':id')
	async updateArticle(@Param('id') id: string,@Req() req: CustomRequest, @Body() updateArticleDto: UpdateArticleDto) {
		const r = await req.user;
		return this.articlesService.update(id, r.sub, updateArticleDto)
	}

	@Delete(':id')
	@HttpCode(204)
	async deleteArticle(@Param('id') id: string, @Req() req: CustomRequest) {
		const r = await req.user;
		return this.articlesService.delete(id, r.sub)
	}
}
