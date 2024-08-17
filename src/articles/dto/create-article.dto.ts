import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	title: string

	@IsOptional()
	@IsString()
	@ApiProperty()
	content: string


	@IsOptional()
	@IsBoolean()
	@ApiProperty()
	published: boolean
}
