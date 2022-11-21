import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ALLOWED_IMPORTS_MIMETYPES } from 'src/shared/enums/accept-files.enum';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) throw new NotFoundException('required file to import');
    if (!ALLOWED_IMPORTS_MIMETYPES.isValid(value.mimetype))
      throw new BadRequestException(
        'invalid file type. try again with a valid sheet file',
      );
    const maxSize = Number(process.env.MAX_FILE_SIZE) || 10485760;
    if (value.size > maxSize)
      throw new BadRequestException(
        'file size is too big. max size is ' +
          Number(maxSize) / 1024 / 1024 +
          'MB',
      );
    return value;
  }
}
