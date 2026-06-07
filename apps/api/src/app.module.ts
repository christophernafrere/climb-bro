import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PartenarshipModule } from './partenarship/partenarship.module';

@Module({
  imports: [AuthModule, UserModule, PartenarshipModule],
  controllers: [AppController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
