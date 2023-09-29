type HttpMap = {
  successful: number;
  created: number;
  notFound: number;
  conflict: number;
  invalidValue: number;
  deleted: number;
};

export type ResponseMessage = { message: string };

export type ResponseService<T> = {
  status: keyof HttpMap;
  data: T | T[] | ResponseMessage;
};

const httpMap: HttpMap = {
  successful: 200,
  created: 201,
  notFound: 404,
  conflict: 409,
  invalidValue: 401,
  deleted: 204,
};

const mapStatusHTTP = (status: keyof HttpMap): number => httpMap[status];

export default mapStatusHTTP;
