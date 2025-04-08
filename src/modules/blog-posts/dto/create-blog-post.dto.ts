import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @IsNotEmpty({ message: 'O título não pode estar vazio' })
  @MaxLength(100, { message: 'O título deve ter no máximo 100 caracteres' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'O conteúdo não pode estar vazio' })
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsString({ each: true })
  @IsNotEmpty({ message: 'O autor precisa ser especificado!' })
  authorId: string;
}