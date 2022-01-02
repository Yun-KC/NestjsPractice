import { CatsRepository } from '../cats.reposipory';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { Cat } from '../cats.shcema';

@Injectable()
export class CatsService {
  constructor(private readonly CatsRepository: CatsRepository) {}

  async getAllCats() {
    const allCats = await this.CatsRepository.findAll();
    const readOnlyCats = allCats.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    console.log(fileName);
    const newCat = await this.CatsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isCatExist = await this.CatsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당 이메일은 이미 존재합니다.');
      // throw new HttpException('해당 이메일은 이미 존재합니다.', 401); 위의 코드와 동일한 역할을 합니다.
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.CatsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
