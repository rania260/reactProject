import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Req, Res } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';  
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostEntity } from './entities/post.entity';

@ApiTags('posts')
@Controller('api/posts') 
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Post successfully created.', type: PostEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('getAll')
  @ApiResponse({ status: 200, description: 'Successfully retrieved all posts.', type: [PostEntity] })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Query('author') author?: string) {
    return this.postsService.findAll(author);
  }

  @Get('get/:id')
  @ApiResponse({ status: 200, description: 'Successfully retrieved post.', type: PostEntity })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Post successfully updated.', type: PostEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Post successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
