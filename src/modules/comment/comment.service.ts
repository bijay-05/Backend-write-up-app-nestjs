import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { IComment } from "./interface";
import { CreateUpdateCommentDto } from "./dto";
import { COMMENT_MESSAGE_CONST } from "src/common/constants/comment.constant";

@Injectable()
export class CommentService {
    constructor(private prismaService: PrismaService) {}

    async getBlogComment(blogId: string): Promise<IComment[]> {
        const logger = new Logger(CommentService.name + "-getBlogComment");
        try {
            const comments = await this.prismaService.comment.findMany({
                where: {
                    blogId: blogId
                }
            });

            if (!comments) throw new NotFoundException(COMMENT_MESSAGE_CONST.ERROR_MESSAGE.COMMENT_NOT_FOUND);

            return comments;
        } catch(err) {
            logger.error(err);
            throw err;
        }
    }

    async createComment(blogId: string, userId: string, createDto: CreateUpdateCommentDto): Promise<IComment> {
        const logger = new Logger(CommentService.name + "-createComment");
        try {
            const comment = await this.prismaService.comment.create({
                data: {
                    userId: userId,
                    blogId: blogId,
                    comment: createDto.comment
                }
            })
            if (!comment) throw new BadRequestException(COMMENT_MESSAGE_CONST.ERROR_MESSAGE.COMMENT_FORMAT_INVALID);

            return comment;
        } catch(err) {
            logger.error(err);
            throw err;
        }
    }

    async updateComment(commentId: string, userId: string, updateDto: CreateUpdateCommentDto): Promise<IComment> {
        const logger = new Logger(CommentService.name + "-updateComment");
        try {
            const comment = await this.prismaService.comment.update({
                where: { id: commentId, userId: userId },
                data: {
                    comment: updateDto.comment
                }
            })

            if (!comment) throw new BadRequestException(COMMENT_MESSAGE_CONST.ERROR_MESSAGE.COMMENT_FORMAT_INVALID);

            return comment;
        } catch(err) {
            logger.error(err);
            throw err;
        }
    }

    async deleteComment(commentId: string, userId: string): Promise<void> {
        const logger = new Logger(CommentService.name + "-deleteComment");
        try {
            await this.prismaService.comment.delete({
                where: {
                    id: commentId,
                    userId: userId
                }
            })
        } catch(err) {
            logger.error(err);
            throw err;
        }
    }
}