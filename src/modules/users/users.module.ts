import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BlogPost } from '../blog-posts/entities/blog-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BlogPost])],
  controllers: [UsersController],
  providers: [UsersService],
})

export class UsersModule {}
