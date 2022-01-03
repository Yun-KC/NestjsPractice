import { CommentsModule } from './../comments/comments.module';
import { CommentsSchema } from './../comments/comments.shcema';
import { AuthModule } from './../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './service/cats.service';
import { Cat, CatSchema } from './cats.shcema';
import { CatsRepository } from './cats.reposipory';
import { MulterModule } from '@nestjs/platform-express';
import { Comments } from 'src/comments/comments.shcema';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
    forwardRef(() => AuthModule),

    forwardRef(() => CommentsModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
