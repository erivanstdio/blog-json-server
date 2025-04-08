import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { Tag } from '../tags/entities/tag.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { User } from '../users/entities/user.entity';
import { UUID } from 'crypto';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepo: Repository<BlogPost>,

    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(createPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const { title, content, tags = [], authorId } = createPostDto;

    // Search for author
    const author = await this.userRepo.findOne({ where: { id: authorId } });
    if (!author) {
      throw new NotFoundException(`Usuário com ID ${authorId} não encontrado`);
    }

    // handle tags
    const tagEntities = tags?.length
      ? await Promise.all(
        tags.map(async (name) => {
          const existing = await this.tagRepo.findOne({ where: { name } });
          return existing ?? this.tagRepo.create({ name });
        }),
      )
      : [];

    // Create blogPost
    const post = this.blogPostRepo.create({
      title,
      content,
      tags: tagEntities,
      authorId: author.id
    });

    return this.blogPostRepo.save(post);
  }

  async findAll(): Promise<BlogPost[]> {
    return this.blogPostRepo.find({ relations: ['tags'] });
  }

  async findOne(id: UUID): Promise<BlogPost> {
    const post = await this.blogPostRepo.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: UUID, updatePostDto: UpdateBlogPostDto): Promise<BlogPost> {
    const post = await this.findOne(id); // Garante que o post existe

    if (updatePostDto.tags) {
      const tagEntities = await Promise.all(
        updatePostDto.tags.map(async (name) => {
          const existing = await this.tagRepo.findOne({ where: { name } });
          return existing ?? this.tagRepo.create({ name });
        }),
      );
      post.tags = tagEntities;
    }

    Object.assign(post, updatePostDto);
    return this.blogPostRepo.save(post);
  }

  async remove(id: UUID): Promise<void> {
    const post = await this.findOne(id); // Verifica se existe
    await this.blogPostRepo.remove(post);
  }
}
