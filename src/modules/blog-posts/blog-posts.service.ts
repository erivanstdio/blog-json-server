import { Injectable } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPost)
    private postRepo: Repository<BlogPost>,

    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}

  async create(createPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const { title, content, tags = [] } = createPostDto;

    const tagEntities = tags?.length
      ? await Promise.all(
          tags.map(async (name) => {
            const existing = await this.tagRepo.findOne({ where: { name } });
            return existing ?? this.tagRepo.create({ name });
          }),
        )
      : [];

    const post = this.postRepo.create({ title, content, tags: tagEntities });

    return this.postRepo.save(post);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdateBlogPostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
