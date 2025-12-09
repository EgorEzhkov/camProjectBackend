import {
  ConflictException,
  Injectable,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { CreateUserSubscriptionDto } from './dto/create-user-subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TariffService } from 'src/tariff/tariff.service';
import { AuthService } from 'src/auth/auth.service';
import { connect } from 'http2';

@Injectable()
export class UserSubscriptionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tariffService: TariffService,
    private readonly authService: AuthService,
  ) {}
  async create(
    createUserSubscriptionDto: CreateUserSubscriptionDto,
  ) {
    const { userId, tariffId, isActive, status } =
      createUserSubscriptionDto;

    const user = await this.authService.validate(userId);

    if (!user)
      throw new NotFoundException('Пользователь не найден');

    const tariff =
      await this.tariffService.findById(tariffId);

    if (!tariff)
      throw new NotFoundException('Тариф не найден');

    const existingSubscription =
      await this.prismaService.userSubscription.findFirst({
        where: { userId: user.id, status: 'ACTIVE' },
      });

    if (existingSubscription) {
      throw new ConflictException(
        'У пользователя уже есть подписка',
      );
    }

    const startedAt = new Date();

    const expiresAt = new Date(startedAt);
    expiresAt.setDate(
      expiresAt.getDate() + tariff.storageDays,
    );

    try {
      const subscribe =
        await this.prismaService.userSubscription.create({
          data: {
            userId: user.id,
            tariffId: tariff.id,
            startedAt: startedAt,
            expiresAt: new Date(expiresAt),
            isActive,
            status,
          },
          include: { tariff: true, user: true },
        });

      return subscribe;
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    const subscriptions =
      await this.prismaService.userSubscription.findMany({
        include: { tariff: true, user: true },
      });

    if (!subscriptions)
      throw new NotFoundException('Подписки не найдены');

    return subscriptions;
  }

  async findById(id: string) {
    const subscription =
      await this.prismaService.userSubscription.findUnique({
        where: { id },
        include: { tariff: true, user: true },
      });

    if (!subscription)
      throw new NotFoundException('Подписка не найдена');

    return subscription;
  }

  async update(
    id: string,
    updateUserSubscriptionDto: UpdateUserSubscriptionDto,
  ) {
    const { isActive, status } = updateUserSubscriptionDto;

    try {
      await this.findById(id);

      const updatedSubscription =
        await this.prismaService.userSubscription.update({
          data: { isActive, status },
          where: { id },
        });

      return updatedSubscription;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    try {
      await this.findById(id);

      await this.prismaService.userSubscription.delete({
        where: { id },
      });

      return 'Подписка удалена';
    } catch (err) {
      throw err;
    }
  }
}
