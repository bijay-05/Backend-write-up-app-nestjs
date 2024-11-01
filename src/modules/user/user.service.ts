import { PrismaService } from 'src/common/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

export interface IUser {
    id: string;
    username: string;
    useremail: string;
    password: string;
    joinedOn: Date;
};

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {};

  async getUser(useremail: string): Promise<IUser | undefined> {
    const logger = new Logger(UserService.name + "-getUser");
    try {
      const user = await this.prismaService.users.findUnique({
        where: { useremail: useremail}
      })

      return user;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
