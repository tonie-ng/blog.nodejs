import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get()
	getUsers(): Promise<User[]> {
		return this.usersService.findAll()
	}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto)
	}

	@Get(':id')
	getUser(@Param('id') id: string): Promise<User> {
		return this.usersService.findById(id)
	}

	@Put(':id')
	updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	@HttpCode(204)
	deleteUser(@Param('id') id: string) {
		return this.usersService.delete(id)
	}
}
