import { UnauthorizedException, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
  companyId: string;
  company_id: string;
  company: string;
  employee: string;
  employeeId: string;
  employee_id: string;
};

export type TokenPayloadMiddleware = {
  tokenPayload: Pick<TokenPayload, 'companyId' | 'employeeId'>;
};

export class ValidateTokenMiddleware implements NestMiddleware {
  use(
    req: Request & TokenPayloadMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    const jwtToken = req.headers.authorization?.split(' ')[1];

    if (!jwtToken) throw new UnauthorizedException('token not found');

    verify(
      jwtToken,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      (err, decoded: TokenPayload) => {
        if (err) throw new UnauthorizedException('bad token');

        req.tokenPayload = {
          ...req.tokenPayload,
          companyId: decoded.companyId,
          employeeId: decoded.employeeId,
        };
      },
    );

    next();
  }
}
