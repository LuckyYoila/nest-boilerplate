import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApiDocument = HydratedDocument<ApiKey>;

@Schema({ timestamps: true })
export class ApiKey {
  @Prop({ type: String })
  key: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
