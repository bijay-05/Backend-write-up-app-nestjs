import { Controller, Get, Post, Put, Delete, Param, HttpCode, HttpStatus, Body, UseGuards } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { AppResponse } from "src/common/api-response";
import { CreateUpdateBlogDto } from "./dto";
import { BLOG_MESSAGE_CONSTANT } from "src/common/constants/blog.constant";
import { AuthGuard } from "src/common/guards";
import { getUser } from "src/common/decorators";
import { IAuthUser } from "../auth/interface";
import { IBlog } from "./interface";

@Controller("blog")
@UseGuards(AuthGuard)
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllPosts(): Promise<AppResponse<IBlog[]>> {
        const blogs = await this.blogService.getAllBlogs();

        return new AppResponse<IBlog[]>(BLOG_MESSAGE_CONSTANT.SUCCESS_MESSAGE.BLOG_FETCH_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(blogs);
    }

    @Get('/user')
    @HttpCode(HttpStatus.OK)
    async getUserPosts(@getUser() authUser: IAuthUser): Promise<AppResponse<IBlog[]>> {
        const blogs = await this.blogService.getUserBlogs(authUser.sub);

        return new AppResponse<IBlog[]>(BLOG_MESSAGE_CONSTANT.SUCCESS_MESSAGE.BLOG_FETCH_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(blogs)
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getPost(@Param("id") id: string): Promise<AppResponse<IBlog>> {
        const blog = await this.blogService.getBlog(id);

        return new AppResponse<IBlog>(BLOG_MESSAGE_CONSTANT.SUCCESS_MESSAGE.BLOG_FETCH_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(blog);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPost(@getUser() authUser: IAuthUser, @Body() createDto: CreateUpdateBlogDto): Promise<AppResponse<IBlog>> {
        const blog = await this.blogService.createBlog(authUser.sub, createDto);
        
        return new AppResponse<IBlog>(BLOG_MESSAGE_CONSTANT.SUCCESS_MESSAGE.BLOG_CREATE_SUCCESS).setStatus(HttpStatus.CREATED).setSuccessData(blog);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    async updatePost(@Param("id") id: string, @getUser() authUser: IAuthUser, @Body() updateDto: CreateUpdateBlogDto): Promise<AppResponse<IBlog>> {
        const blog = await this.blogService.updateBlog(id, authUser.sub, updateDto);

        return new AppResponse<IBlog>(BLOG_MESSAGE_CONSTANT.SUCCESS_MESSAGE.BLOG_UPDATE_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(blog);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async deletePost(@Param("id") id: string): Promise<AppResponse<null>> {
        await this.blogService.deleteBlog(id);

        return new AppResponse<null>(BLOG_MESSAGE_CONSTANT.SUCCESS_MESSAGE.BLOG_DELETE_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(null);
    }
}