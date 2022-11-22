import { Global, Module } from '@nestjs/common';
import { makeMongooseConnectionProviders } from './mongoose.providers';
import { makeProviders } from './schemas';

const providers = [...makeMongooseConnectionProviders(), ...makeProviders()];

@Global()
@Module({
  imports: [],
  providers: providers,
  exports: providers,
})
export class MongodbModule {}
