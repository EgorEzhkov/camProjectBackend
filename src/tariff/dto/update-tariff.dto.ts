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
) {}
