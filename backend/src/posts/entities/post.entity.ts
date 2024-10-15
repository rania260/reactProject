import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';  // Import correct de 'Types' depuis 'mongoose'
import { User } from '../../auth/schemas/user.schema';  // Assure-toi que le chemin est correct

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })  // Utilisation correcte de 'Types.ObjectId'
  author: User;  // Relation avec l'utilisateur

  @Prop({ default: 0 })
  likes: number;  // Compteur de likes
}

export const PostSchema = SchemaFactory.createForClass(Post);
