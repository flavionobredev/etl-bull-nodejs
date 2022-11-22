import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtractModule } from './extract/extract.module';
import { ConsumerModule } from './consumer/consumer.module';
import { DatabaseModule } from './shared/data/data.module';

@Module({
  imports: [
    DatabaseModule,
    BullModule.forRoot({
      prefix: 'import:extract',
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    ExtractModule,
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
