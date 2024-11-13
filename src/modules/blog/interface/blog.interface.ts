import { JsonValue } from "@prisma/client/runtime/library";

export interface IBlog {
    id: string;
    title: string;
    content: string;
    createdOn: Date;
    updatedOn: Date;
    userId: string;
    tags: JsonValue;
}