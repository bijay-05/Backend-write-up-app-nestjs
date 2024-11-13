import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";

@Module({
    imports: [PrismaModule],
    controllers: [CommentController],
    providers: [CommentService]
})
export class CommentModule {}