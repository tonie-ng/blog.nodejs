import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma/prisma.service';
import { Prisma, Article } from '@prisma/client';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindArticlesDto } from './dto/find-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
	constructor(private prisma: PrismaService) { }

	async findByID(id: string): Promise<Article | null> {
		return this.prisma.article.findFirst({
			where: { id }
		})
	}

	async create(createArticleDto: CreateArticleDto, userId: string): Promise<Article | null> {
		return this.prisma.article.create({
			data: {
				...createArticleDto, author: {
					connect: { id: userId }
				}
			}
		})
	}

	async findAllFiltered(findArticleDto: FindArticlesDto): Promise<Article[]> {
		return this.prisma.article.findMany({
			where: {
				AND: [
					{ published: true },
					{
						OR: [
							{ title: { contains: findArticleDto.searchString } },
							{ content: { contains: findArticleDto.searchString } }
						]
					}
				]
			}
		})
	}

	async findAll(): Promise<Article[]> {
		return this.prisma.article.findMany({
			where: { published: true }
		})
	}

	async findDrafts(userid: string): Promise<Article[]> {
		return this.prisma.article.findMany({
			where: { AND: [{ published: true }, { authorId: userid }] }
		})
	}

	async update(id: string, userId: string, updateArticleDto: UpdateArticleDto): Promise<Article | null> {
		const article = await this.findByID(id);
		if (!article) {
			throw new NotFoundException('Resource does not exist', {
				description: `Article with ID ${id} does not exist`
			});
		}

		if (userId != article.authorId) {
			throw new UnauthorizedException('Not enough permission', {
				description: `Article does not belong to current user`
			})
		}
		return this.prisma.article.update({
			data: updateArticleDto,
			where: { id }
		})
	}

	async delete(id: string, userId: string) {
		const article = await this.findByID(id);
		if (!article) {
			throw new NotFoundException('Resource does not exist', {
				description: `Article with ID ${id} does not exist`
			});
		}

		if (userId != article.authorId) {
			throw new UnauthorizedException('Not enough permission', {
				description: `Article does not belong to current user`
			})
		}

		return this.prisma.article.delete({
			where: { id }
		})
	}
}
