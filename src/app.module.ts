import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { validateAppEnv } from './app-env.validation';
import { AuthModule, UserModule, BlogModule, CommentModule } from 'src/modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      validate: validateAppEnv
    }),
    PrismaModule,
    BlogModule,
    AuthModule,
    UserModule,
    CommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
