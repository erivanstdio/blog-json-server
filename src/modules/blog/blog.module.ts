import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [TypeOrmModule.forFeature([
    Blog
  ])],
})
export class BlogModule { }
