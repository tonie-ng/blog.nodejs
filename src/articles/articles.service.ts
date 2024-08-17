import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma/prisma.service';
import { Prisma, Article } from '@prisma/client';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindArticlesDto } from './dto/find-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
	constructor(private prisma: PrismaService) { }

	test = new PrismaService
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
				OR: [
					{ title: { contains: findArticleDto.searchString } },
					{ content: { contains: findArticleDto.searchString } }
				]
			}
		})
	}

	async findAll(): Promise<Article[]> {
		return this.prisma.article.findMany()
	}

	async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article | null> {
		if (!(await this.findByID(id))) {
			throw new NotFoundException('Resource does not exist', {
				description: `Article with ID ${id} does not exist`
			});
		}
		return this.prisma.article.update({
			data: updateArticleDto,
			where: { id }
		})
	}

	async delete(id: string) {
		if (!(await this.findByID(id))) {
			throw new NotFoundException('Resource does not exist', {
				description: `Article with ID ${id} does not exist`
			});
		}
		return this.prisma.article.delete({
			where: { id }
		})
	}
}
