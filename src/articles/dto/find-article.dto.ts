import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FindArticlesDto {
	@IsString()
	@ApiProperty()
	searchString: string
}
