import db from '../database/db';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  published_at: Date;
  updated_at: Date;
  categories: string[];
  tags: string[];
  excerpt: string;
  status: string;
}

export class PostRepository {
  // Criar uma nova postagem
  async create(post: Post) {
    const result = await db.none(
      'INSERT INTO posts(title, content, author, published_at, updated_at, categories, tags, excerpt, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [post.title, post.content, post.author, post.published_at, post.updated_at, post.categories, post.tags, post.excerpt, post.status]
    );
    return result;
  }

  // Obter todas as postagens
  async getAll() {
    return db.any('SELECT * FROM posts');
  }

  // Obter uma postagem pelo ID
  async getById(id: number) {
    return db.oneOrNone('SELECT * FROM posts WHERE id = $1', [id]);
  }

  // Atualizar uma postagem
  async update(id: number, post: Partial<Post>) {
    const fields = Object.keys(post).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = Object.values(post);

    await db.none(`UPDATE posts SET ${fields} WHERE id = $${values.length + 1}`, [...values, id]);
  }

  // Deletar uma postagem
  async delete(id: number) {
    await db.none('DELETE FROM posts WHERE id = $1', [id]);
  }
}