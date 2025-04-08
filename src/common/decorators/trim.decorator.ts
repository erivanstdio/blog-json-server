// src/common/decorators/trim.decorator.ts

import { Transform } from 'class-transformer';

/**
 * Remove espaços antes e depois da string
 * Ex: "   nome  " → "nome"
 */
export function Trim() {
  return Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value
  );
}
