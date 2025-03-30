import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './blog.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getHello() {
    return this.blogService.findAll();
  }

  @Post()
  async createBlog(@Body() blog: Blog) {
    const blogCreated = await this.blogService.create(blog);
    return blogCreated;
  }

}
