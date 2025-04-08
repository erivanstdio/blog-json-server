import { Repository } from 'typeorm';
import { Tag } from 'src/modules/tags/entities/tag.entity';

/**
 * Transforma a primeira letra de cada palavra em maiúscula.
 * Exemplo: "react native" → "React Native"
 */
function capitalizeWords(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Retorna uma lista de entidades `Tag` persistidas (existentes ou recém criadas),
 * normalizando os nomes com a primeira letra maiúscula.
 */
export async function resolveTags(
  tagRepo: Repository<Tag>,
  tagNames: string[],
): Promise<Tag[]> {
  if (!tagNames?.length) return [];

  // Capitalize the first letter
  const normalizedNames = tagNames.map(capitalizeWords);

  // Filter existing Tags
  const existingTags = await tagRepo.find({
    where: normalizedNames.map((name) => ({ name })),
  });

  const existingNames = existingTags.map((tag) => tag.name);

  // Filter tags not existing in DB
  const newTagNames = normalizedNames.filter(
    (name) => !existingNames.includes(name),
  );

  // Create and save new tags
  const newTags = newTagNames.map((name) => tagRepo.create({ name }));
  const savedNewTags = await tagRepo.save(newTags);

  return [...existingTags, ...savedNewTags];
}
