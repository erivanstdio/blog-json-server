import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>
  ) {}

  async create(createBlog: Blog) {
    const blog = this.blogRepository.create(createBlog);
    return this.blogRepository.save(blog);
  }

  async findAll() {
    return this.blogRepository.find();
  }

  getHello() {
    return 'welcome to blog';
  }
}
