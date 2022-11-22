import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface Company {
  whatsapps: object;
  official_whatsapps: object;
  whatsapps_integrations_type: object;
}

export type CompanyDocument = Company & Document;

@Schema()
class _CompanySchema implements Company {
  @Prop({
    type: Object,
  })
  whatsapps: object;

  @Prop({
    type: Object,
  })
  official_whatsapps: object;

  @Prop({
    type: String,
  })
  whatsapps_integrations_type: object;
}

export const CompanySchema = SchemaFactory.createForClass(_CompanySchema);
