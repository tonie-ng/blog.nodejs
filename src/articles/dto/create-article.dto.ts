import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
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
}
