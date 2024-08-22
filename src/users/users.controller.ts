import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookMarkedArticle, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from '@src/auth/auth.decorator';
import { Request } from 'express';
import { CustomRequest } from '@src/auth/auth.guard';
import { CreateBookMarkDto } from './dto/create-bookmark.dto';
import { DeleteBookMarkDto } from './dto/delete-bookmark.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@IsPublic()
	@Get()
	getUsers(): Promise<User[]> {
		return this.usersService.findAll()
	}

	@IsPublic()
	@Post()
	createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto)
	}

	@IsPublic()
	@Get(':id')
	getUser(@Param('id') id: string): Promise<User> {
		return this.usersService.findById(id)
	}

	@Put(':id')
	async updateUser(@Param('id') id: string, @Req() req: CustomRequest, @Body() updateUserDto: UpdateUserDto): Promise<User> {
		const r = await req.user
		return this.usersService.update(id, r.sub, updateUserDto);
	}

	@Delete(':id')
	@HttpCode(204)
	async deleteUser(@Param('id') id: string, @Req() req: CustomRequest) {
		const r = await req.user
		return this.usersService.delete(id, r.sub)
	}

	@Post(':id/bookmarks')
	createBookmark(@Param('id') id: string, @Body() { postId }: CreateBookMarkDto): Promise<BookMarkedArticle> {
		return this.usersService.createBookmark(id, postId)
	}

	@Get(':id/bookmarks')
	async getBookMarks(@Req() req: CustomRequest): Promise<BookMarkedArticle[]> {
		const r = await req.user
		return this.usersService.getBookmarks(r.sub)
	}

	@Delete(':id/bookmarks')
	@HttpCode(204)
	deleteBookmark(@Param('id') id: string, @Body() { bookmarkId }: DeleteBookMarkDto) {
		return this.usersService.deleteBookmark(id, bookmarkId);
	}
}
