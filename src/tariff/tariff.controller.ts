import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';

@Controller('tariff')
export class TariffController {
  constructor(
    private readonly tariffService: TariffService,
  ) {}

  @Post('/admin')
  create(@Body() createTariffDto: CreateTariffDto) {
    return this.tariffService.create(createTariffDto);
  }

  @Get('/admin')
  findAll() {
    return this.tariffService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tariffService.findById(id);
  }

  @Post('getId')
  getIdByName(@Body('name') name: string) {
    return this.tariffService.getIdTarrifByName(name);
  }

  @Patch('/admin/:id')
  update(
    @Param('id') id: string,
    @Body() updateTariffDto: UpdateTariffDto,
  ) {
    return this.tariffService.update(id, updateTariffDto);
  }

  @Delete('/admin/:id')
  remove(@Param('id') id: string) {
    return this.tariffService.remove(id);
  }
}
