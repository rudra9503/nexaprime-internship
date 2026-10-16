import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  // PRACTICE ONLY: real projects use a database and hashed passwords.
  private readonly demoUser = {
    id: 1,
    email: 'demo@example.com',
    password: 'password123',
  };

  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginDto) {
    const valid =
      dto.email === this.demoUser.email &&
      dto.password === this.demoUser.password;

    if (!valid) {
      // Same message for both cases, so attackers can't tell which was wrong.
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: this.demoUser.id, email: this.demoUser.email };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}