import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
		private configService: ConfigService
	) { }

	private tsecret = this.configService.get('JWT_SECRET');
	private texpiration = this.configService.get('JWT_EXPIRATION');

	async validateUser(loginDto: LoginDto): Promise<User | null> {
		const user = await this.userService.findByEmail(loginDto.email);
		if (user && await bcrypt.compare(loginDto.password, user.password)) { return user }
		return null
	}

	async login(loginDto: LoginDto) {
		const user = await this.validateUser(loginDto);
		if (!user) {
			throw new UnauthorizedException('Invalid Credentials', {
				description: "username or password is not correct"
			})
		}

		const authtoken = await this.generateJwtToken(user.id);
		return {
			...user,
			authtoken
		}
	}

	async generateJwtToken(id: string): Promise<string> {
		return this.jwtService.signAsync({ sub: id })
	}
}
