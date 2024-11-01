import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { PostsModule } from 'src/modules/posts/posts.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validateAppEnv } from './modules/app-env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      validate: validateAppEnv
    }),
    PrismaModule,
    PostsModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
