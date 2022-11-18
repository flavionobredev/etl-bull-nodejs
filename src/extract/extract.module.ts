import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { Extract } from './extract';
import { ExtractController } from './extract.controller';

@Module({
  imports: [
    BullModule.forRoot({
      prefix: 'import:extract',
      redis: 'redis://redis:6379',
    }),
  ],
  providers: [Extract],
  controllers: [ExtractController],
})
export class ExtractModule {}
