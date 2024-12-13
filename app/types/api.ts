export type ApiResponse<T = undefined> = {
    success: boolean;
    code: number;
    message: string;
    data?: T;
    error?: {
      code: number;
      message: string;
    };
  };