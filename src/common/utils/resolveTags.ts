import { Repository } from 'typeorm';
import { Tag } from 'src/modules/tags/entities/tag.entity';

/**
 * Retorna uma lista de entidades `Tag` persistidas (existentes ou recém criadas),
 * normalizando os nomes para lowercase e impedindo duplicatas.
 */
export async function resolveTags(
  tagRepo: Repository<Tag>,
  tagNames: string[],
): Promise<Tag[]> {
  if (!tagNames?.length) return [];

  // Normalize tags para lowercase
  const normalizedNames = tagNames.map((name) => name.toLowerCase());

  // Busca tags já existentes
  const existingTags = await tagRepo.find({
    where: normalizedNames.map((name) => ({ name })),
  });

  const existingNames = existingTags.map((tag) => tag.name);

  // Cria apenas as que ainda não existem
  const newTagNames = normalizedNames.filter(
    (name) => !existingNames.includes(name),
  );

  const newTags = newTagNames.map((name) => tagRepo.create({ name }));
  const savedNewTags = await tagRepo.save(newTags);

  return [...existingTags, ...savedNewTags];
}
