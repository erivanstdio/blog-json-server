import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { UUID } from 'crypto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const normalizedName = createTagDto.name.toLowerCase();

    const existing = await this.tagRepo.findOne({ where: { name: normalizedName } });
    if (existing) {
      throw new ConflictException('Tag já existe');
    }

    const tag = this.tagRepo.create({ name: normalizedName });
    return this.tagRepo.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: UUID): Promise<Tag> {
    const tag = await this.tagRepo.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`Tag com id ${id} não encontrada`);
    }
    return tag;
  }

  async update(id: UUID, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id);

    if (updateTagDto.name) {
      const normalizedName = updateTagDto.name.toLowerCase();

      const duplicate = await this.tagRepo.findOne({ where: { name: normalizedName } });
      if (duplicate && duplicate.id !== id) {
        throw new ConflictException('Outra tag com esse nome já existe');
      }

      tag.name = normalizedName;
    }

    return this.tagRepo.save(tag);
  }

  async remove(id: UUID): Promise<void> {
    const tag = await this.findOne(id);
    await this.tagRepo.remove(tag);
  }
}
