import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';

export const jwtConfig: JwtModuleAsyncOptions = {
	useFactory: (configService: ConfigService) => ({
		global: true,

	}),
}
