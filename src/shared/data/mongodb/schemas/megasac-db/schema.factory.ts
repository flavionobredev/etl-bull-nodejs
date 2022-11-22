import { Connection } from 'mongoose';
import { Provider } from '@nestjs/common';
import { CompanySchema } from './collections';
import {
  DatabaseMongoEnum,
  MongoModelProviderEnum,
} from 'src/shared/data/providers.enum';

export const makeProviders = (): Provider[] => [
  // {
  // 	provide: MongoModelProviderEnum.TALLOS_MEGASAC_TAGS,
  // 	useFactory: (connection: Connection) => connection.model('tags', tallosMegasacTagSchema),
  // 	inject: [DatabaseMongoEnum.TALLOS_MEGASAC],
  // },

  // {
  // 	provide: MongoModelProviderEnum.TALLOS_MEGASAC_CUSTOMERS,
  // 	useFactory: (connection: Connection) => connection.model('customers', tallosMegasacCustomerSchema),
  // 	inject: [DatabaseMongoEnum.TALLOS_MEGASAC],
  // },

  // {
  // 	provide: MongoModelProviderEnum.TALLOS_MEGASAC_CUSTOMERS_TO_IMPORT,
  // 	useFactory: (connection: Connection) => connection.model('customerstoimport', tallosMegasacCustomerToImportSchema),
  // 	inject: [DatabaseMongoEnum.TALLOS_MEGASAC],
  // },

  {
    provide: MongoModelProviderEnum.COMPANIES_COLL,
    useFactory: (connection: Connection) =>
      connection.model('companies', CompanySchema),
    inject: [DatabaseMongoEnum.TALLOS_MEGASAC],
  },

  // {
  // 	provide: MongoModelProviderEnum.TALLOS_MEGASAC_EMPLOYEE,
  // 	useFactory: (connection: Connection) => connection.model('employees', tallosMegasacEmployeeSchema),
  // 	inject: [DatabaseMongoEnum.TALLOS_MEGASAC],
  // },

  // {
  // 	provide: MongoModelProviderEnum.TALLOS_MEGASAC_IMPORT_CUSTOMERS_LOGS,
  // 	useFactory: (connection: Connection) =>
  // 		connection.model('importcustomerslogs', tallosMegasacImportCustomersLogsSchema),
  // 	inject: [DatabaseMongoEnum.TALLOS_MEGASAC],
  // },
];
