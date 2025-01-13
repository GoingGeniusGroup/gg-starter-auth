
type ResponseSuccess<T = undefined> = {
    success: true;
    code: 200 | 201 | 202 | 203 | 204;
    message: string;
    data?: T;
  };
  
  type ResponseError = {
    success: false;
    error: {
      code: 400 | 401 | 402 | 403 | 404 | 405 | 406 | 408 | 410 | 422 | 429 | 500 | 502 | 503;
      message: string;
    };
  };
  
  export type ResponseWithMessage = ResponseSuccess | ResponseError;
  
  export function response<T>(response: ResponseSuccess<T> | ResponseError): ResponseSuccess<T> | ResponseError {
    return response;
  }
  export type SuccessResponse<T> = {
    success: true;
    code: number;
    message: string;
    data: T;
  };
  
  export type ErrorResponse = {
    success: false;
    error: {
      code: number;
      message: string;
    };
  };
  
  export type AvatarResponse = SuccessResponse<{ avatar_id: string; avatar_url: string }> | ErrorResponse;
  
  export function avatar_response<T>(response: SuccessResponse<T> | ResponseError): SuccessResponse<T> | ErrorResponse {
    return response;
  }