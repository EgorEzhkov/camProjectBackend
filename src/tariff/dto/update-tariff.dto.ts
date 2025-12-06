import { PartialType } from '@nestjs/mapped-types';
import { CreateTariffDto } from './create-tariff.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateTariffDto extends PartialType(
  CreateTariffDto,
) {
  @IsOptional()
  @IsNotEmpty({ message: 'Поле name не может быть пустым' })
  @IsString({ message: 'Поле name должно быть строкой' })
  @MaxLength(30, {
    message: 'Поле name не может превышать 30 символов',
  })
  @ApiProperty({
    description: 'Именование тарифа',
    example: 'Бизнес',
    type: String,
  })
  name?: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Поле price не должно быть пустым',
  })
  @IsInt({ message: 'Поле price должно быть целым числом' })
  @ApiProperty({
    description: 'Цена тарифа',
    example: 999,
    type: Number,
  })
  price?: number;

  @IsOptional()
  @IsNotEmpty({
    message: 'Поле storageDays не может быть пустым',
  })
  @IsInt({
    message: 'Поле storageDays должно быть числом',
  })
  @ApiProperty({
    description: 'Количество дней хранения архивов записей',
    example: 90,
    type: Number,
  })
  storageDays?: number;

  @IsOptional()
  @IsNotEmpty({
    message: 'Поле cameraLimit не может быть пустым',
  })
  @IsInt({
    message: 'Поле cameraLimit должно быть числом',
  })
  @ApiProperty({
    description: 'Лимит по количеству камер',
    example: 3,
    type: Number,
  })
  cameraLimit?: number;
}
