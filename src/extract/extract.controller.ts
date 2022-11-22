import {
  Body,
  Controller,
  HttpCode,
  Post, Response,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response as Res } from 'express';
import { PermissionsGuard } from 'src/shared/guards/general-permissions.guard';
import { Extract } from './extract';
import { FileValidationPipe } from './validations/file.pipe';

@Controller('import')
@UseGuards(PermissionsGuard)
export class ExtractController {
  constructor(private readonly extractService: Extract) {}

  @Post()
  @HttpCode(204)
  @UseInterceptors(FileInterceptor('file'))
  async publishExtract(
    @UploadedFile(FileValidationPipe) file: Express.Multer.File,
    @Body() body: any,
    @Response() response: Res,
  ) {
    response.status(204).send();
    // TODO: add company and employee validation
    this.extractService.read(file);
  }
}
