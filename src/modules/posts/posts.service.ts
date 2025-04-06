import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,

    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { title, content, tags } = createPostDto;

    const tagEntities = tags?.length
      ? await Promise.all(
          tags.map(async (name) => {
            const existing = await this.tagRepo.findOne({ where: { name } });
            return existing || this.tagRepo.create({ name });
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

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
