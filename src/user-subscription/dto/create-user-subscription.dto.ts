import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserSubscriptionDto {
  @IsString({
    message: 'Поле tarrifId должно быть строкой',
  })
  @IsNotEmpty({
    message: 'Поле tarrifId не должно быть пустым',
  })
  @ApiProperty({
    description: 'id тарифа',
    type: String,
    example: '3c905b59-8fc9-4dc3-8781-1c0caae106bb',
  })
  tariffId: string;

  @IsString({ message: 'Поле userId должно быть строкой' })
  @IsNotEmpty({
    message: 'Поле userId не должно быть пустым',
  })
  @ApiProperty({
    description: 'id пользователя',
    type: String,
    example: '3c905b59-8fc9-4dc3-8781-1c0caae106bb',
  })
  userId: string;

  @IsBoolean({
    message: 'Поле isActive должно быть булевым значением',
  })
  @IsNotEmpty({
    message: 'Поле isActive не должно быть пустым',
  })
  @ApiProperty({
    description: 'Показывает состояние подписки',
    type: String,
    example: false,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Статус подписки',
    example: Status.ACTIVE,
    enum: Status,
  })
  @IsEnum(Status, {
    message:
      'status должен быть одним из значений enum Status',
  })
  status: Status;
}
