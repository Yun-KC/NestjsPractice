import { Comments } from './../comments/comments.shcema';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'abc@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '나비',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123qwe',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'imgUrl',
    description: 'imgUrl',
    required: false,
  })
  @Prop({
    default: `https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg`,
  })
  @IsString()
  imgUrl: string;

  readonly comments: Comments[];

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  }; // 실제 db에 존재하는 필드는 아님!
}

const _CatSchema = SchemaFactory.createForClass(Cat);
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});
_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
/* 
함수 매개변수에 this가 들어갈 수 있는 방법

class Cat {
  constructor(public name: string, public alias: string) {}
  test(){}
}
function test(this:Cat){
  console.log(this);
}
Cat.prototype.test = test;

const cat:Cat = (new Cat('먼치킨', '나비'))
cat.test();


// 또는 

class Cat {
  constructor(public name: string, public alias: string) {}
  test(this: Cat): void{
    console.log(this);
  }
}
const cat:Cat = (new Cat('먼치킨', '나비'))
cat.test();
*/
