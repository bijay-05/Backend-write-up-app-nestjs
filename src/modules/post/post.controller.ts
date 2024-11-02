import { Controller, Get, Post, Put, Delete, Param, HttpCode, HttpStatus, Body, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { AppResponse } from "src/common/api-response";
import { CreateUpdatePostDto } from "./dto";
import { POST_MESSAGE_CONSTANT } from "src/common/constants/post.constant";
import { AuthGuard } from "src/common/guards";
import { getUser } from "src/common/decorators";
import { IAuthUser } from "../auth/interface";
import { IPost } from "./interface";

@Controller("post")
@UseGuards(AuthGuard)
export class PostController {
    constructor(private postService: PostService) {}

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getPost(@Param("id") id: string): Promise<AppResponse<IPost>> {
        const post = await this.postService.getPost(id);

        return new AppResponse<IPost>(POST_MESSAGE_CONSTANT.SUCCESS_MESSAGE.POST_FETCH_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(post)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPost(@getUser() authUser: IAuthUser, @Body() createDto: CreateUpdatePostDto): Promise<AppResponse<IPost>> {
        const post = await this.postService.createPost(authUser.sub, createDto);
        
        return new AppResponse<IPost>(POST_MESSAGE_CONSTANT.SUCCESS_MESSAGE.POST_CREATE_SUCCESS).setStatus(HttpStatus.CREATED).setSuccessData(post);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    async updatePost(@Param("id") id: string, @getUser() authUser: IAuthUser, @Body() updateDto: CreateUpdatePostDto): Promise<AppResponse<IPost>> {
        const post = await this.postService.updatePost(id, authUser.sub, updateDto);

        return new AppResponse<IPost>(POST_MESSAGE_CONSTANT.SUCCESS_MESSAGE.POST_UPDATE_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(post);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async deletePost(@Param("id") id: string): Promise<AppResponse<null>> {
        await this.postService.deletePost(id);

        return new AppResponse<null>(POST_MESSAGE_CONSTANT.SUCCESS_MESSAGE.POST_DELETE_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(null);
    }
}