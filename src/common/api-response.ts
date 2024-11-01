interface IAppResponse<T> {
    status: number;
    message: string;
    totalCount?: number;
    data: T
}

export class BaseResponse {
    status: number;
    message: string;
    success: boolean;
}

export class AppResponse<T> implements IAppResponse<T> {
    status: number;
    message: string;
    totalCount?: number;
    data: T;

    constructor(message: string) {
        this.message = message;
    }

    setStatus(status: number): this {
        this.status = status;
        return this;
    }

    setSuccessData(data: T, totalCount = 0): this {
        this.data = data
        if (totalCount > 0) this.totalCount = totalCount;
        return this;
    }
}