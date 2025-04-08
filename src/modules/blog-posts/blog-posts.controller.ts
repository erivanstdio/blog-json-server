import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost } from './entities/blog-post.entity';
import { UUID } from 'crypto';

@Controller('posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostDto: CreateBlogPostDto): Promise<BlogPost> {
    return this.blogPostsService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<BlogPost[]> {
    return this.blogPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: UUID): Promise<BlogPost> {
    return this.blogPostsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: UUID,
    @Body() updatePostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogPostsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: UUID): Promise<void> {
    return this.blogPostsService.remove(id);
  }
}
