import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from '../blog-posts/entities/blog-post.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(BlogPost)
    private blogPostRepo: Repository<BlogPost>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Este e-mail já está em uso.');
    }

    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findAllUsersWithBlogPosts(): Promise<User[]> {
    return this.userRepo.find({
      relations: ['blogPosts'],
    })
  }

  async findOne(id: UUID): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  async findOneUserWithBlogPosts(id: UUID): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['blogPosts'] });

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  async update(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: UUID): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
  }

  // Extra: buscar posts de um usuário
  async findPostsByUser(userId: UUID): Promise<BlogPost[]> {
    return this.blogPostRepo.find({
      where: { author: { id: userId } },
      relations: ['author'],
    });
  }
}
