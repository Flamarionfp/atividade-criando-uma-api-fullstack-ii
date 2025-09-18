import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../core/http/http-status.enum";
import { ZodError } from "zod";

export class ExceptionHandlerMiddleware {
  private parse = (error: Error) => {
    const statusMap: Record<string, HttpStatus> = {
      BadRequestException: HttpStatus.BAD_REQUEST,
      NotFoundException: HttpStatus.NOT_FOUND,
      InternalServerException: HttpStatus.INTERNAL_SERVER_ERROR,
      UnauthorizedException: HttpStatus.UNAUTHORIZED,
      ForbiddenException: HttpStatus.FORBIDDEN,
    };

    const status = statusMap[error?.name] || HttpStatus.INTERNAL_SERVER_ERROR;

    return {
      status,
      message: error.message,
    };
  };

  handle = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      next(error);

      return;
    }

    let statusCode: number;
    let message: string;

    if (error instanceof ZodError) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = this.formatZodError(error).join(", ");
    } else {
      const parsedError = this.parse(error);
      statusCode = parsedError.status;
      message = parsedError.message;
    }

    res.status(statusCode).json({ message });
  };

  private formatZodError = (error: ZodError) => {
    return error.issues.map((issue) => {
      const path = issue.path.join(".");
      return path ? `Erro no campo '${path}': ${issue.message}` : issue.message;
    });
  };
}
