export interface ApiResponse<T> {
    success: boolean;
    message: string[];
    data?: T;
  }
  
  export function sendSuccess<T>(res: any, data?: T, statusCode = 200) {
    res.status(statusCode).json({
      success: true,
      data,
    } as ApiResponse<T>);
  }
  
  export function sendError(res: any, message: string[], statusCode = 400) {
    res.status(statusCode).json({
      success: false,
      message,
    } as ApiResponse<null>);
  }