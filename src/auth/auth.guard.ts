import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
		private configService: ConfigService
	) { }

	private tsecret = this.configService.get('JWT_SECRET');

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (isPublic) return true
		const req = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(req);
		if (token == '') {
			throw new UnauthorizedException('You are not authorized to access this resource', {
				description: 'Please login to access this resource'
			});
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

	private extractTokenFromHeader(req: Request): string {
		const [type, token] = req.headers.authorization?.split(' ') ?? [];

		return type === 'Bearer' ? token : '';
	}
}
