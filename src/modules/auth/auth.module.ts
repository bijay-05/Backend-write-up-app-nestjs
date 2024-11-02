import { Module } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/common/prisma/prisma.module";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            verifyOptions: { ignoreExpiration: false }
        }),
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}