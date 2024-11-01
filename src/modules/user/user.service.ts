import { PrismaService } from 'src/common/prisma/prisma.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JsonValue } from '@prisma/client/runtime/library';
import { CreateUpdateUserDto } from './dto';

export interface IUser {
    id: string;
    username: string;
    useremail: string;
    password: string;
    bio: string;
    joinedOn: Date;
    following: JsonValue;
};

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {};

  async getUser(userId: string): Promise<IUser | undefined> {
    const logger = new Logger(UserService.name + "-getUser");
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId }
      });

      return user;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async createUser(createDto: CreateUpdateUserDto): Promise<IUser | undefined> {
    const logger = new Logger(UserService.name + "-createUser");
    try {
        //check unique email address;
        // const userEmailTaken = await this.getUser(createDto.useremail);
        // if (userEmailTaken?.useremail) throw new BadRequestException("email taken already")
        
            //save user
        // const hashPassword = bcryp

        const user = await this.prismaService.user.create({
          data: {
            useremail: createDto.useremail,
            username: createDto.username,
            password: createDto.password,
            bio: createDto.bio,
            following: { ["userId"]: [] }
          }
        })

        return user;
    } catch (err) {
        logger.error(err);
        throw err;
    }
  }

  async updateUser(userId: string, updateDto: CreateUpdateUserDto): Promise<IUser | undefined> {
    const logger = new Logger(UserService.name + "-updateUser");
    try {
      const user = await this.prismaService.user.update({
        where: {
          id: userId
        },
        data: updateDto
      })

      return user;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
