import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";

@Schema({
  timestamps: true
})
export class Post extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  @ApiProperty()
  author: Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  content: string;

  @Prop({ default: 0 })
  @ApiProperty()
  likes: number;

  @Prop({ type: [String] })
  @ApiProperty()
  comments: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
