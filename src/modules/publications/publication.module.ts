import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublicationsService } from './publication.service';
import { PublicationsController } from './publication.controller';
import { Publication } from './entities/publication.entity';
import { Tag } from '../tags/entities/tag.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publication, Tag, User])],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule {}
