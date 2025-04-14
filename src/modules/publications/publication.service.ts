import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';
import { Tag } from '../tags/entities/tag.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { User } from '../users/entities/user.entity';
import { UUID } from 'crypto';
import { resolveTags } from 'src/common/utils/resolveTags';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepo: Repository<Publication>,

    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(createPostDto: CreatePublicationDto): Promise<Publication> {
    const { title, content, tags = [], authorId } = createPostDto;

    // Search for author
    const author = await this.userRepo.findOne({ where: { id: authorId } });
    if (!author) {
      throw new NotFoundException(`Usuário com ID ${authorId} não encontrado`);
    }

    const tagEntities = await resolveTags(this.tagRepo, tags);

    // Create publication
    const post = this.publicationRepo.create({
      title,
      content,
      tags: tagEntities,
      author: author
    });

    return this.publicationRepo.save(post);
  }

  async findAll(): Promise<Publication[]> {
    return this.publicationRepo.find({ relations: ['tags', 'author'] });
  }

  async findOne(id: UUID): Promise<Publication> {
    const post = await this.publicationRepo.findOne({
      where: { id },
      relations: ['tags', 'author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: UUID, updatePostDto: UpdatePublicationDto): Promise<Publication> {
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
    return this.publicationRepo.save(post);
  }

  async remove(id: UUID): Promise<void> {
    const post = await this.findOne(id); // Verify if this publication exists
    await this.publicationRepo.remove(post);
  }
}
