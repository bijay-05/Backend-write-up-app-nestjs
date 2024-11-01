import { PrismaService } from 'src/common/prisma/prisma.service';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JsonValue } from '@prisma/client/runtime/library';
import { CreateUpdateUserDto } from './dto';
import { USER_MESSAGE_CONSTANT } from 'src/common/constants/user.constant';

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

  async getUserByEmail(useremail: string): Promise<IUser | undefined> {
    const logger = new Logger(UserService.name + "-getUserByEmail");
    try {
      const user = await this.prismaService.user.findUnique({
        where: { useremail: useremail }
      });

      if (!user) throw new NotFoundException(USER_MESSAGE_CONSTANT.ERROR_MESSAGE.USER_NOT_FOUND)

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
        const userEmailTaken = await this.checkEmail(createDto.useremail)
        if (userEmailTaken) throw new BadRequestException(USER_MESSAGE_CONSTANT.ERROR_MESSAGE.EMAIL_ALREADY_TAKEN)
        
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

  private async checkEmail(email: string): Promise<boolean> {
    const logger = new Logger(UserService.name + "-checkEmail");
    try {
      const emailList = await this.prismaService.user.findMany({
        select: { useremail: true }
      })

      const emailExists = emailList.findIndex(emailObject => emailObject.useremail == email);

      if (emailExists !== -1) return true;
      return false;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
