import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookMarkDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	postId: string;
}
