import { Repository } from 'typeorm';
import { Tag } from 'src/modules/tags/entities/tag.entity';

/**
 * Retorna uma lista de entidades `Tag` persistidas (existentes ou recém criadas).
 *
 * @param tagRepo - repositório de Tag (TypeORM)
 * @param tagNames - nomes das tags (strings)
 */
export async function resolveTags(
  tagRepo: Repository<Tag>,
  tagNames: string[],
): Promise<Tag[]> {
  if (!tagNames?.length) return [];

  // Busca tags já existentes no banco
  const existingTags = await tagRepo.find({
    where: tagNames.map((name) => ({ name })),
  });

  const existingNames = existingTags.map((tag) => tag.name);

  // Filtra nomes que ainda não existem
  const newTagNames = tagNames.filter((name) => !existingNames.includes(name));

  // Cria e salva novas tags
  const newTags = newTagNames.map((name) => tagRepo.create({ name }));
  const savedNewTags = await tagRepo.save(newTags);

  return [...existingTags, ...savedNewTags];
}
