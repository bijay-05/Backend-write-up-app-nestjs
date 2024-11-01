import { Module } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            verifyOptions: { ignoreExpiration: false }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}