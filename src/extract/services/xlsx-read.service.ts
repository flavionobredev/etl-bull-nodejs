import { ReadFileUseCase } from '../domain/usecase/read-file.usecase';
import { read as XlsxRead, stream, utils } from 'xlsx';
import { Readable } from 'stream';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadSheetService implements ReadFileUseCase {
  readToCsv(buffer: Buffer): Readable {
    const workbook = XlsxRead(buffer, { type: 'buffer' });
    stream.set_readable(Readable);
    return stream.to_csv(workbook.Sheets[workbook.SheetNames[0]], {
      blankrows: false,
    }) as Readable;
  }
}
