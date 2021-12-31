import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.shcema';

export class ReadOnlyCatDTO extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '$2b$10$hEzqvMPu02iW0BISTDGS2u3kGrYM8qByGKg8v8sZcPYITG8iKaRSa',
    description: 'id',
  })
  id: string;
}
