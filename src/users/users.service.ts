import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService, private configService: ConfigService) { }


	private salt = this.configService.get('SALT');

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany()
	}

	async findById(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { email } });
	}

	async delete(id: string, userId: string): Promise<User> {
		const user = await this.findById(id);
		if (!user) {
			throw new NotFoundException('Resource does not exist', {
				description: `User with ID ${id} does not exist`
			});
		}
		if (userId != user.id) {
			throw new UnauthorizedException('Not enough permission', {
				description: `User does not belong to current user`
			})
		}
		return this.prisma.user.delete({
			where: { id }
		})
	}

	async update(id: string, userId: string, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.findById(id);
		if (!user) {
			throw new NotFoundException('Resource does not exist', {
				description: `User with ID ${id} does not exist`
			});
		}
		if (userId != user.id) {
			throw new UnauthorizedException('Not enough permission', {
				description: `User does not belong to current user`
			})
		}

		const { password } = updateUserDto;
		if (password) {
			updateUserDto.password = await bcrypt.hash(password, this.salt);
		}

		return this.prisma.user.update({
			data: updateUserDto,
			where: { id }
		})
	}

	async findUnique(email: string, username: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				OR: [
					{ email },
					{ userName: username }
				]
			}
		});
	}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const { email, password, firstName, lastName, userName } = createUserDto;

		const existingUser = await this.findUnique(email, userName);
		if (existingUser) {
			const field = existingUser.email === email ? email : userName;
			throw new ConflictException('Resource already exists', {
				description: `User with this ${field} already exists`
			});
		}

		const hashedPwd = await bcrypt.hash(password, this.salt);
		return this.prisma.user.create({
			data: {
				email,
				password: hashedPwd,
				firstName,
				lastName,
				userName
			}
		})
	}
}
