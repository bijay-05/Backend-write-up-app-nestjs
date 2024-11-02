import { Controller, Get, Post, Put, Param, HttpCode, HttpStatus, Body, UseGuards } from "@nestjs/common";
import { IUser, UserService } from "./user.service";
import { AppResponse } from "src/common/api-response";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { USER_MESSAGE_CONSTANT } from "src/common/constants/user.constant";
import { AuthGuard } from "src/common/guards";
import { getUser } from "src/common/decorators";
import { IAuthUser } from "../auth/interface";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {};

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async getUser(@Param("id") id: string): Promise<AppResponse<IUser>> {
        const user = await this.userService.getUser(id);
        return new AppResponse<IUser>(USER_MESSAGE_CONSTANT.SUCCESS_MESSAGE.USER_FETCH_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(user);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() createDto: CreateUserDto): Promise<AppResponse<IUser>> {
        const user = await this.userService.createUser(createDto);
        return new AppResponse<IUser>(USER_MESSAGE_CONSTANT.SUCCESS_MESSAGE.USER_CREATE_SUCCESS).setStatus(HttpStatus.CREATED).setSuccessData(user);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async updateUser(@getUser() authUser: IAuthUser, @Body() updateDto: UpdateUserDto): Promise<AppResponse<IUser>> {
        const user = await this.userService.updateUser(authUser.sub, updateDto);
        return new AppResponse<IUser>(USER_MESSAGE_CONSTANT.SUCCESS_MESSAGE.USER_UPDATE_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(user);
    }
}