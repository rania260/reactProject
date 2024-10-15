import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>{
        return{
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),}
        }
        }
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService,GoogleStrategy],
  exports: [JwtModule, JwtService],
})
export class AuthModule {}
