import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostSchema } from './entities/post.entity';
import { JwtModule } from '@nestjs/jwt';  // Importing JwtModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    JwtModule,  // Make sure JwtModule is imported here
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
