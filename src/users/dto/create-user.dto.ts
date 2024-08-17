import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	firstName: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	userName: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	password: string;
}
