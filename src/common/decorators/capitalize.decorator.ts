import { Transform } from 'class-transformer';

/**
 * Capitaliza a primeira letra de cada palavra da string.
 * Ex: "minha nova tag" → "Minha Nova Tag"
 */
export function Capitalize() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    return value
      .toLowerCase()
      .split(' ')
      .map((word) =>
        word.length > 0
          ? word[0].toUpperCase() + word.slice(1)
          : ''
      )
      .join(' ');
  });
}
