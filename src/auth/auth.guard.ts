import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
		private configService: ConfigService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) { }

	private tsecret = this.configService.get('JWT_SECRET');

	async canActivate(
		context: ExecutionContext,
	): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (isPublic) return true
		const req = context.switchToHttp().getRequest();
		const token = ExtractTokenFromHeader(req);
		if (token == '') {
			throw new UnauthorizedException('You are not authorized to access this resource', {
				description: 'Please login to access this resource'
			});
		}
		const blacklisted = await this.cacheManager.get(token);
		if (blacklisted) {
			throw new UnauthorizedException('Invalid Jwt token');
		}
		const payload = this.jwtService.verifyAsync(
			token, {
			secret: this.tsecret
		}
		)
		if (!payload) {
			throw new UnauthorizedException('You are not authorized to access this resource', {
				description: 'Please login to access this resource'
			});
		}
		req['user'] = payload;
		return true;
	}
}

export class CustomRequest extends Request {
	user: {
		sub: string
	}
}

export function ExtractTokenFromHeader(req: Request): string {
	const [type, token] = req.headers.authorization?.split(' ') ?? [];

	return type === 'Bearer' ? token : '';
}
