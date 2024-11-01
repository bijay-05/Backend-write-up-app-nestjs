import { IAuthToken } from './interface/auth.interface';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from "uuid";
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prismaService: PrismaService
  ) {}

  async logIn(useremail: string, pass: string): Promise<IAuthToken> {
    const logger = new Logger(AuthService.name + "-logIn");
    try {
      const user = await this.userService.getUserByEmail(useremail);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, sessionId: uuidv4() }

      //save session in database
      await this.prismaService.session.create({
        data: {
            id: payload.sessionId,
            userId: payload.sub
        }
      })

      return {
        accesstoken: await this.jwtService.signAsync(
          payload, 
          {
            secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
            expiresIn: this.configService.get<string>("ACCESS_TOKEN_EXPIRY")
          }
        ),
        refreshtoken: await this.jwtService.signAsync(
            payload,
            {
                secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
                expiresIn: this.configService.get<string>("REFRESH_TOKEN_EXPIRY")
            }
        )
      }
      
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getRefreshToken(token: string): Promise<IAuthToken> {
    const logger = new Logger(AuthService.name + "-getRefreshToken");
    try {
        //verify token and check session
        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: this.configService.get<string>("REFRESH_TOKEN_SECRET")
            }
        ) as {sub: string; sessionId: string};
        //check session
        const session = await this.prismaService.session.findUnique({
            where: { id: payload?.sessionId }
        })

        return {
            accesstoken: await this.jwtService.signAsync(
                payload, 
                {
                  secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
                  expiresIn: this.configService.get<string>("ACCESS_TOKEN_EXPIRY")
                }
              ),
              refreshtoken: token
        }
    } catch (err) {
        logger.error(err);
        throw err;
    }
  }

  async deleteSession(sessionId: string): Promise<void> {
    const logger = new Logger(AuthService.name + "-logout");
    try {
        await this.prismaService.session.delete({
            where: { id: sessionId }
        })
    } catch (err) {
        logger.error(err);
        throw err;
    }
  }
}
