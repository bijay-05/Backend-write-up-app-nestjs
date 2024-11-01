import { Controller, Get, Post, Put, Param, HttpCode, HttpStatus, Body } from "@nestjs/common";
import { IUser, UserService } from "./user.service";
import { PrismaService } from "src/common/prisma/prisma.service";
import { AppResponse } from "src/common/api-response";
import { CreateUpdateUserDto } from "./dto";
import { USER_MESSAGE_CONSTANT } from "src/common/constants/user.constant";

export class UserController {
    constructor(
        private prismaService: PrismaService,
        private userService: UserService
    ) {};

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getUser(@Param("id") id: string): Promise<AppResponse<IUser>> {
        const user = await this.userService.getUser(id);
        return new AppResponse<IUser>(USER_MESSAGE_CONSTANT.SUCCESS_MESSAGE.USER_FETCH_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(user);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createDto: CreateUpdateUserDto): Promise<AppResponse<IUser>> {
        const user = await this.userService.createUser(createDto);
        return new AppResponse<IUser>(USER_MESSAGE_CONSTANT.SUCCESS_MESSAGE.USER_CREATE_SUCCESS).setStatus(HttpStatus.CREATED).setSuccessData(user);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    async updateUser(@Param("id") id: string, @Body() updateDto: CreateUpdateUserDto): Promise<AppResponse<IUser>> {
        const user = await this.userService.updateUser(id, updateDto);
        return new AppResponse<IUser>(USER_MESSAGE_CONSTANT.SUCCESS_MESSAGE.USER_UPDATE_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(user);
    }
}