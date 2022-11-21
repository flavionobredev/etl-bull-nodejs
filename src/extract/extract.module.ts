import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { Extract } from './extract';
import { ExtractController } from './extract.controller';
import { ReadSheetService } from './services/xlsx-read.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'new-import',
    })
  ],
  providers: [Extract, ReadSheetService],
  controllers: [ExtractController],
})
export class ExtractModule {}
