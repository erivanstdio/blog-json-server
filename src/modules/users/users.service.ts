import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from '../publications/entities/publication.entity';
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

    @InjectRepository(Publication)
    private publicationRepo: Repository<Publication>
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

  async findAllUsersWithPublications(): Promise<User[]> {
    return this.userRepo.find({
      relations: ['publications'],
    })
  }

  async findOne(id: UUID): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  async findOneUserWithPublications(id: UUID): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['publications'] });

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

  // Extra: search user publications
  async findPublicationsByUser(userId: UUID): Promise<Publication[]> {
    return this.publicationRepo.find({
      where: { author: { id: userId } },
      relations: ['author'],
    });
  }
}
