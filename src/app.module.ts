import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
			validationSchema: Joi.object({
				DATABASE_URL: Joi.string().required(),
				JWT_SECRET: Joi.string().required(),
				JWT_EXPIRATION: Joi.string().required(),
				SALT: Joi.number().required(),
			})
		}),
		PrismaModule,
		UsersModule,
		ArticlesModule,
		AuthModule
	],
})
export class AppModule { }
