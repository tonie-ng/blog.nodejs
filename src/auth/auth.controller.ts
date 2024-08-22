import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from './auth.decorator';
import { ExtractTokenFromHeader } from './auth.guard';
import { Request } from 'express';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@IsPublic()
	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto)
	}

	@Get('logout')
	async logout(@Req() req: Request) {
		const token = ExtractTokenFromHeader(req)
		return this.authService.logout(token)
	}
}
