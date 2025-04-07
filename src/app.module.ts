import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogPostsModule } from './modules/blog-posts/blog-posts.module';
import { UsersModule } from './modules/users/users.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'blog',
      entities: [
        __dirname + '/modules/**/*.entity{.ts,.js}'
      ],
      synchronize: true,
    }),
    BlogPostsModule,
    UsersModule,
    TagsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
