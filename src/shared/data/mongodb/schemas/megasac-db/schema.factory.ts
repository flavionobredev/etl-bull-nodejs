import { Connection } from 'mongoose';
import { Provider } from '@nestjs/common';
import { CompanySchema, EmployeeSchema } from './collections';
import {
  DatabaseMongoEnum,
  MongoModelProviderEnum,
} from 'src/shared/data/providers.enum';

export const makeProviders = (): Provider[] => [
  {
    provide: MongoModelProviderEnum.COMPANIES_COLL,
    useFactory: (connection: Connection) =>
      connection.model('companies', CompanySchema),
    inject: [DatabaseMongoEnum.MEGASAC_DATABASE],
  },

  {
    provide: MongoModelProviderEnum.EMPLOYEES_COLL,
    useFactory: (connection: Connection) =>
      connection.model('employees', EmployeeSchema),
    inject: [DatabaseMongoEnum.MEGASAC_DATABASE],
  },
];
