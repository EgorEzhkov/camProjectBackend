import { Module } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { UserSubscriptionController } from './user-subscription.controller';
import { TariffService } from 'src/tariff/tariff.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { TariffModule } from 'src/tariff/tariff.module';

@Module({
  imports: [TariffModule, AuthModule],
  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionService],
})
export class UserSubscriptionModule {}
