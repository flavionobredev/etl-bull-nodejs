import {
  UnauthorizedException,
  NestMiddleware,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { CompanyDocument, EmployeeDocument } from '../data/mongodb/schemas';
import { CompanyRepository, EmployeeRepository } from '../repository';

type TokenPayload = {
  companyId: string;
  company_id: string;
  company: string;
  employee: string;
  employeeId: string;
  employee_id: string;
};

export type TokenPayloadMiddleware = {
  tokenPayload: {
    company: CompanyDocument;
    employee: EmployeeDocument;
  };
};

@Injectable()
export class ValidateTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

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
      async (err, decoded: TokenPayload) => {
        if (err) throw new UnauthorizedException('bad token');

        try {
          const companyId =
            decoded.companyId || decoded.company_id || decoded.company;
          const employeeId =
            decoded.employeeId || decoded.employee_id || decoded.employee;

          if (!companyId || !employeeId)
            throw new UnauthorizedException('bad token');

          // TODO: melhoria com cache!!!!
          const company = await this.getCompanyResource(companyId);
          const employee = await this.getEmployeeResource(employeeId);
          req.tokenPayload = {
            ...req.tokenPayload,
            company: company,
            employee: employee,
          };
          next();
        } catch (err) {
          next(err);
        }
      },
    );
  }

  private async getCompanyResource(companyId: string) {
    const company = await this.companyRepository.findById(companyId, {
      _id: 1,
      whatsapps: 1,
    });
    if (!company) throw new BadRequestException('company not found');
    return company;
  }

  private async getEmployeeResource(employeeId: string) {
    const employee = await this.employeeRepository.findById(employeeId, {
      _id: 1,
      role: 1,
      name: 1,
    });
    if (!employee) throw new BadRequestException('employee not found');
    return employee;
  }
}
