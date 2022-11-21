import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { Consumer } from './consumer';

@Module({
  controllers: [ConsumerController],
  providers: [Consumer]
})
export class ConsumerModule {}
