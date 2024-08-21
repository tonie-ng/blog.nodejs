import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteBookMarkDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	bookmarkId: string;
}
