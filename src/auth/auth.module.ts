import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@src/users/users.module';
import { UsersService } from '@src/users/users.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
	imports: [
		UsersModule,
		PrismaModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				global: true,
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.get('JWT_EXPIRATION')
				}
			}),
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [AuthService, UsersService, {
		provide: APP_GUARD,
		useClass: AuthGuard
	}],
})
export class AuthModule { }
