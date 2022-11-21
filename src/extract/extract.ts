import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Multer } from 'multer';
import { ReadSheetService } from './services/xlsx-read.service';
import { Writable } from 'stream';
import { HeadersEnum } from 'src/shared/enums/headers.enum';

@Injectable()
export class Extract {
  constructor(
    @InjectQueue('new-import') private readonly newImportQueue: Queue,
    private readonly readSheet: ReadSheetService,
  ) {}

  async read(file: Express.Multer.File) {
    const readable = this.readSheet.readToCsv(file.buffer);
    readable.on('data', this.writeToQueue().bind(this));
    // TODO: readable.on("error", ...)
  }

  async publish(message: any) {
    this.newImportQueue.add(message);
  }

  private writeToQueue() {
    return function (chunk: Buffer) {
      const values = chunk
        .toString()
        .split(',')
        .map((value) => value.replace(/\n/, '').trim());

      /** o parse é feito primeiro pois, atualmente, o primeiro chunk sempre é [''].
       * logo, o segundo é, de fato, a primeira linha.
       * */
      if (this.isFirstChunk !== false) {
        this.headers = HeadersEnum.parseHeaders(values);
        this.isFirstChunk = values.length === 1 && values[0] === '';
        return;
      }
      const obj = {};
      this.headers.forEach((header, index) => {
        obj[header] = [null, undefined, ''].includes(values[index])
          ? null
          : values[index];
      });

      this.publish(obj);
    };
  }
}
