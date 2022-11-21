import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ValidateTokenMiddleware } from 'src/shared/middlewares/token.middleware';
import { Extract } from './extract';
import { ExtractController } from './extract.controller';
import { ReadSheetService } from './services/xlsx-read.service';
import { FileValidationPipe } from './validations/file.pipe';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'new-import',
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 4,
        removeOnFail: true,
      },
    }),
  ],
  providers: [Extract, ReadSheetService, FileValidationPipe],
  controllers: [ExtractController],
})
export class ExtractModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateTokenMiddleware).forRoutes(ExtractController);
  }
}
