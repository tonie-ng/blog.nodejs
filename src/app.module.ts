import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
	imports: [PrismaModule, UsersModule, ConfigModule.forRoot({ isGlobal: true }), ArticlesModule],
})
export class AppModule { }
