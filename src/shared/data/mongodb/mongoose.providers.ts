import { Provider } from '@nestjs/common';
import { createConnection } from 'mongoose';
import { DatabaseMongoEnum } from '../providers.enum';

export const makeMongooseConnectionProviders = (): Provider[] => [
	{
		provide: DatabaseMongoEnum.TALLOS_MEGASAC,
		useFactory: () =>
			createConnection(process.env.MEGASAC_CONNECTION, {
				autoIndex: false,
			}),
	},
	// {
	// 	provide: DatabaseMongoEnum.BROKERS_DATABASE,
	// 	useFactory: () =>
	// 		createConnection(process.env.BROKERS_DATABASE, {
	// 			autoIndex: false,
	// 		}),
	// },
];
