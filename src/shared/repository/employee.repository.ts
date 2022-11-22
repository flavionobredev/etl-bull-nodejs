import { Inject, Injectable } from '@nestjs/common';
import { Model, ProjectionFields } from 'mongoose';
import { EmployeeDocument } from '../data/mongodb/schemas';
import { MongoModelProviderEnum } from '../data/providers.enum';

@Injectable()
export class EmployeeRepository {
  constructor(
    @Inject(MongoModelProviderEnum.EMPLOYEES_COLL)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async findById(
    id: string,
    projection: ProjectionFields<EmployeeDocument> = {},
  ) {
    return this.employeeModel.findById(id, projection);
  }
}
