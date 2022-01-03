import { Comments, CommentsSchema } from './../comments/comments.shcema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from './cats.shcema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
  ) {}

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);
    console.log(CommentsModel === this.commentModel);
    console.log();
    console.log(this.catModel);
    const result = await this.catModel
      .find()
      .populate('comments', this.commentModel);
    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

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
