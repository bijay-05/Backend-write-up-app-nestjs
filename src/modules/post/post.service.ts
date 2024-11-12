import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { IPost } from "./interface";
import { POST_MESSAGE_CONSTANT } from "src/common/constants/post.constant";
import { CreateUpdatePostDto } from "./dto";
import { title } from "process";

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService) {}

    async getAllPosts(): Promise<IPost[]> {
        const logger = new Logger(PostService.name + "-getAllPosts");
        try {
            const posts = await this.prismaService.post.findMany({
                orderBy: {
                    createdOn: "desc"
                }
            });
            return posts;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async getUserPosts(id: string): Promise<IPost[]> {
        const logger = new Logger(PostService.name + "-getUserPosts");
        try {
            const posts = await this.prismaService.post.findMany({
                where: { userId: id},
                orderBy: {
                    createdOn: "desc"
                }
            })
            return posts;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async getPost(id: string): Promise<IPost> {
        const logger = new Logger(PostService.name + "-getPost");
        try {
            const post = await this.prismaService.post.findUnique({
                where: {
                    id: id
                }
            })

            if (!post) throw new NotFoundException(POST_MESSAGE_CONSTANT.ERROR_MESSAGE.POST_NOT_FOUND)

            return post;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async createPost(userId: string, createDto: CreateUpdatePostDto): Promise<IPost> {
        const logger = new Logger(PostService.name + "-createPost");
        try {
            const post = await this.prismaService.post.create({
                data: {
                    title: createDto.title,
                    content: createDto.content,
                    userId: userId
                }
            })

            return post;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async updatePost(postId: string, userId: string, updateDto: CreateUpdatePostDto): Promise<IPost> {
        const logger = new Logger(PostService.name + "-updatePost");
        try {
            const post = await this.prismaService.post.upsert({
                where: { id: postId },
                update: {
                    title: updateDto.title,
                    content: updateDto.content
                },
                create: {
                    title: updateDto.title,
                    content: updateDto.content,
                    userId: userId
                }
            });

            return post;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async deletePost(postId: string): Promise<void> {
        const logger = new Logger(PostService.name + "-deletePost");
        try {
            await this.prismaService.post.delete({
                where: { id: postId }
            });
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }
}