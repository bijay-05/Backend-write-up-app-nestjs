import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
// import { PostsModule } from 'src/modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { validateAppEnv } from './app-env.validation';
import { AuthModule, UserModule } from 'src/modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      validate: validateAppEnv
    }),
    PrismaModule,
    // PostsModule,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
