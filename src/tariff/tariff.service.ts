import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tariff } from './entity/tariff.entity';

@Injectable()
export class TariffService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  async create(
    createTariffDto: CreateTariffDto,
  ): Promise<Tariff> {
    const { name } = createTariffDto;

    const exists =
      await this.prismaService.tariff.findUnique({
        where: { name },
      });

    if (exists)
      throw new BadRequestException(
        'Тариф с таким именем уже существует',
      );

    const tariff = await this.prismaService.tariff.create({
      data: createTariffDto,
    });

    return tariff;
  }

  async findAll(): Promise<Tariff[]> {
    const res = await this.prismaService.tariff.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res;
  }

  async findById(id: string): Promise<Tariff> {
    const res = await this.prismaService.tariff.findUnique({
      where: { id },
    });

    if (!res)
      throw new NotFoundException('Тариф не найден');

    return res;
  }

  async update(
    id: string,
    updateTariffDto: UpdateTariffDto,
  ): Promise<Tariff> {
    try {
      await this.findById(id);

      return await this.prismaService.tariff.update({
        where: { id },
        data: updateTariffDto,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new BadRequestException(
          'Тариф с таким именем уже существует',
        );
      }
      throw e;
    }
  }

  async remove(id: string): Promise<string> {
    try {
      await this.findById(id);

      await this.prismaService.tariff.delete({
        where: { id },
      });

      return 'Тариф удалён';
    } catch (e) {
      throw e;
    }
  }
}
