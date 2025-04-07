import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost } from './entities/blog-post.entity';

@Controller('posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  create(@Body() createPostDto: CreateBlogPostDto): Promise<BlogPost> {
    return this.blogPostsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.blogPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogPostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdateBlogPostDto) {
    return this.blogPostsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogPostsService.remove(+id);
  }
}
