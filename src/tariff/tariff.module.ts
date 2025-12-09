import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';

@Module({
  controllers: [TariffController],
  providers: [TariffService],
  exports: [TariffService],
})
export class TariffModule {}
