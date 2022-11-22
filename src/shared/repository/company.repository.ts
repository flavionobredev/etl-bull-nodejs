import { Inject, Injectable } from '@nestjs/common';
import { Model, ProjectionFields } from 'mongoose';
import { CompanyDocument } from '../data/mongodb/schemas';
import { MongoModelProviderEnum } from '../data/providers.enum';

@Injectable()
export class CompanyRepository {
  constructor(
    @Inject(MongoModelProviderEnum.COMPANIES_COLL)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async findById(
    id: string,
    projection: ProjectionFields<CompanyDocument> = {},
  ) {
    return this.companyModel.findById(id, projection);
  }
}
