import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface Employee {
  name: string;
  role: string;
}

export type EmployeeDocument = Employee & Document;

@Schema()
class _EmployeeSchema implements Employee {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  role: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(_EmployeeSchema);
