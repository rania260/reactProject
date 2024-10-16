import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): Promise<PostEntity>;
    findAll(author?: string): Promise<PostEntity[]>;
    findOne(id: string): Promise<PostEntity>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
