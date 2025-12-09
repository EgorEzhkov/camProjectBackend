-- DropForeignKey
ALTER TABLE "public"."user_subscriptions" DROP CONSTRAINT "user_subscriptions_tariffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_subscriptions" DROP CONSTRAINT "user_subscriptions_userId_fkey";

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
