import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { BlogPost } from '../blog-posts/entities/blog-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost, Tag])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
