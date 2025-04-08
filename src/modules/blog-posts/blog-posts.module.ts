import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogPostsService } from './blog-posts.service';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPost } from './entities/blog-post.entity';
import { Tag } from '../tags/entities/tag.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost, Tag, User])],
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
})
export class BlogPostsModule {}
