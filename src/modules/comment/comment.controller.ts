import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Body, Param, UseGuards } from "@nestjs/common"
import { CommentService } from "./comment.service"
import { CreateUpdateCommentDto } from "./dto"
import { IAuthUser } from "../auth/interface"
import { AppResponse } from "src/common/api-response"
import { IComment } from "./interface"
import { getUser } from "src/common/decorators"
import { COMMENT_MESSAGE_CONST } from "src/common/constants/comment.constant"
import { AuthGuard } from "src/common/guards"

@Controller("comment/:id")
@UseGuards(AuthGuard)
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getBlogComments(@Param("id") id: string): Promise<AppResponse<IComment[]>> {
        const comments = await this.commentService.getBlogComment(id);

        return new AppResponse<IComment[]>(COMMENT_MESSAGE_CONST.SUCCESS_MESSAGE.COMMENT_FETCH_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(comments)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createComment(@Param("id") id: string, @getUser() authUser: IAuthUser, @Body() createDto: CreateUpdateCommentDto): Promise<AppResponse<IComment>> {
        const comment = await this.commentService.createComment(id, authUser.sub, createDto);

        return new AppResponse<IComment>(COMMENT_MESSAGE_CONST.SUCCESS_MESSAGE.COMMENT_CREATE_SUCCESS).setStatus(HttpStatus.CREATED).setSuccessData(comment);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async updateComment(@Param("id") id: string, @getUser() authUser: IAuthUser, @Body() updateDto: CreateUpdateCommentDto): Promise<AppResponse<IComment>> {
        const comment = await this.commentService.updateComment(id, authUser.sub, updateDto);

        return new AppResponse<IComment>(COMMENT_MESSAGE_CONST.SUCCESS_MESSAGE.COMMENT_UPDATE_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(comment);
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    async deleteComment(@Param("id") id: string, @getUser() authUser: IAuthUser): Promise<AppResponse<null>> {
        await this.commentService.deleteComment(id, authUser.sub)

        return new AppResponse<null>(COMMENT_MESSAGE_CONST.SUCCESS_MESSAGE.COMMENT_DELETE_SUCCESS).setStatus(HttpStatus.OK).setSuccessData(null)
    }
}