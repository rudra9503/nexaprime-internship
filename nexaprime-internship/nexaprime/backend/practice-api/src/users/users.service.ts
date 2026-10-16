import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(dto: CreateUserDto): User {
    const user: User = {
      id: this.nextId++,
      name: dto.name.trim(),
      email: dto.email.toLowerCase(),
    };
    this.users.push(user);
    return user;
  }
}