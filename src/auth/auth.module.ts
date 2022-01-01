import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './../cats/cats.module';
import { JwtStrategty } from './jwt/jwt.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategty],
  exports: [AuthService],
})
export class AuthModule {}
