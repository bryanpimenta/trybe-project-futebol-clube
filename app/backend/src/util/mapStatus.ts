type HttpMap = {
    SUCCESSFUL: number;
    CREATED: number;
    NOT_FOUND: number;
    CONFLICT: number;
    INVALID_VALUE: number;
    DELETED: number;
};

export type ResponseMessage = { message: string };

export type ResponseService<T> = {
    status: keyof HttpMap;
    data: T | T[] | ResponseMessage;
};

const HTTP_MAP: HttpMap = {
    SUCCESSFUL: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INVALID_VALUE: 422,
    DELETED: 204,
};

const mapStatusHTTP = (status: keyof HttpMap): number => HTTP_MAP[status] || 500;

export default mapStatusHTTP;