import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { IBlog } from "./interface";
import { BLOG_MESSAGE_CONSTANT } from "src/common/constants/blog.constant";
import { CreateUpdateBlogDto } from "./dto";

@Injectable()
export class BlogService {
    constructor(private prismaService: PrismaService) {}

    async getAllBlogs(): Promise<IBlog[]> {
        const logger = new Logger(BlogService.name + "-getAllBlogs");
        try {
            const posts = await this.prismaService.blog.findMany({
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

    async getUserBlogs(id: string): Promise<IBlog[]> {
        const logger = new Logger(BlogService.name + "-getUserPosts");
        try {
            const posts = await this.prismaService.blog.findMany({
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

    async getBlog(id: string): Promise<IBlog> {
        const logger = new Logger(BlogService.name + "-getPost");
        try {
            const blog = await this.prismaService.blog.findUnique({
                where: {
                    id: id
                }
            })

            if (!blog) throw new NotFoundException(BLOG_MESSAGE_CONSTANT.ERROR_MESSAGE.BLOG_NOT_FOUND)

            return blog;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async createBlog(userId: string, createDto: CreateUpdateBlogDto): Promise<IBlog> {
        const logger = new Logger(BlogService.name + "-createBlog");
        try {
            const tags = createDto.tags
            const blog = await this.prismaService.blog.create({
                data: {
                    title: createDto.title,
                    content: createDto.content,
                    userId: userId,
                    tags: { tags }
                }
            })

            return blog;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async updateBlog(postId: string, userId: string, updateDto: CreateUpdateBlogDto): Promise<IBlog> {
        const logger = new Logger(BlogService.name + "-updateBlog");
        try {
            const tags = updateDto?.tags
            const blog = await this.prismaService.blog.upsert({
                where: { id: postId },
                update: {
                    title: updateDto.title,
                    content: updateDto.content
                },
                create: {
                    title: updateDto.title,
                    content: updateDto.content,
                    userId: userId,
                    tags: { tags }
                }
            });

            return blog;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async deleteBlog(postId: string): Promise<void> {
        const logger = new Logger(BlogService.name + "-deleteBlog");
        try {
            await this.prismaService.blog.delete({
                where: { id: postId }
            });
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }
}