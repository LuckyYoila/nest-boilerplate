import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Team } from 'src/app/teams/entities/team.entity';

const userTypes = {
  ADMIN: 'admin',
  USER: 'player',
  PATRON: 'patron',
  TEAM_ADMIN: 'team-admin',
};

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  first_name: string;

  @Prop({ type: String })
  last_name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, enum: [...Object.values(userTypes)] })
  role: string;

  @Prop({ type: String })
  profile_picture: string;

  @Prop({ type: String })
  pictures: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Team.name })
  team: Types.ObjectId;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Team.name,
    default: [],
  })
  previous_teams: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
