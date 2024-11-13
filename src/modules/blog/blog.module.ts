import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";

@Module({
    imports: [PrismaModule],
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule {}