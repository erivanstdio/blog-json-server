import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './modules/posts/posts.module';
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
    PostsModule,
    UsersModule,
    TagsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
