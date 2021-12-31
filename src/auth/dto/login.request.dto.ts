import { PickType } from '@nestjs/swagger';
import { Cat } from '../../cats/cats.shcema';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
