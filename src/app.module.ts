import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtractModule } from './extract/extract.module';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [
    BullModule.forRoot({
      prefix: 'import:extract',
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    ExtractModule,
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
