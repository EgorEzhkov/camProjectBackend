import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { type RegisterRequest } from './dto/register.dto';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async register(dto: RegisterRequest) {
    const { email, name, password } = dto;

    const existUser =
      await this.prismaService.user.findUnique({
        where: { email: email },
      });

    if (existUser) {
      throw new ConflictException(
        'Пользователь с такой почтой уже существует',
      );
    }

    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: await hash(password),
      },
    });

    return user;
  }
}
