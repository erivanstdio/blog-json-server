import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PublicationsService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from './entities/publication.entity';
import { UUID } from 'crypto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostDto: CreatePublicationDto): Promise<Publication> {
    return this.publicationsService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<Publication[]> {
    return this.publicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID): Promise<Publication> {
    return this.publicationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: UUID,
    @Body() updatePostDto: UpdatePublicationDto,
  ): Promise<Publication> {
    return this.publicationsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: UUID): Promise<void> {
    return this.publicationsService.remove(id);
  }
}
