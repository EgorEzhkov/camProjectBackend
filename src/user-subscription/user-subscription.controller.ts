import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { CreateUserSubscriptionDto } from './dto/create-user-subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user-subscription.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Подписки пользователей')
@Controller('user-subscription')
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionService,
  ) {}

  @ApiOperation({
    summary: 'Создание подписки',
    description: 'Создает пользователю подписку на тариф',
  })
  @Post()
  create(
    @Body()
    createUserSubscriptionDto: CreateUserSubscriptionDto,
  ) {
    return this.userSubscriptionService.create(
      createUserSubscriptionDto,
    );
  }

  @ApiOperation({
    summary: 'Возвращает подписки',
    description: 'Возвращает все подписки пользователей',
  })
  @Get()
  findAll() {
    return this.userSubscriptionService.findAll();
  }

  @ApiOperation({
    summary: 'Возвращает подписку по id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSubscriptionService.findById(id);
  }

  @ApiOperation({
    summary: 'Изменяет подписку',
    description:
      'Можно изменить поля подписки (status, isActive, ...)',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateUserSubscriptionDto: UpdateUserSubscriptionDto,
  ) {
    return this.userSubscriptionService.update(
      id,
      updateUserSubscriptionDto,
    );
  }

  @ApiOperation({
    summary: 'Удаляет подписку',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSubscriptionService.remove(id);
  }

  @ApiOperation({
    summary: 'Получение подписок по id пользователя',
    description: 'Можно получить все подписки пользователя',
  })
  @Get('findByUserId/:id')
  findByUserId(@Param('id') id: string) {
    return this.userSubscriptionService.findByUserId(id);
  }
}
