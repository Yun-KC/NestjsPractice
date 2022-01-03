import { PickType } from '@nestjs/swagger';
import { Comments } from '../comments.shcema';

export class CommentsCreateDto extends PickType(Comments, [
  'author',
  'contents',
] as const) {}
