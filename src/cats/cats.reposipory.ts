import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.shcema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email }); // 필터와 일치하는 문서가 데이터베이스에 존재 유무에 따라 이행된 프라미스 true와 false 를 리턴합니다.
    return result;
  }
  async create(cat: CatRequestDto): Promise<Cat> {
    return this.catModel.create(cat);
  }
  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }
}