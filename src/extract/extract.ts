import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Multer } from 'multer';
import { ReadSheetService } from './services/xlsx-read.service';
import { Writable } from 'stream';

enum HeadersEnum {
  nome = 'name',
  email = 'email',
  'e-mail' = 'email',
  telefone = 'phone',
  celular = 'phone',
  tags = 'tags',
  tag = 'tags',
  código = 'code',
  codigo = 'code',
}

@Injectable()
export class Extract {
  constructor(
    @InjectQueue('new-import') private readonly newImportQueue: Queue,
    private readonly readSheet: ReadSheetService,
  ) {}

  async read(file: Express.Multer.File) {
    const readable = this.readSheet.read(file.buffer);
    readable.on('data', this.writeToQueue().bind(this));
  }

  async publish(message: any) {
    this.newImportQueue.add(message, {
      removeOnComplete: {
        age: 60 * 60 * 1,
      },
    });
  }

  private writeToQueue() {
    return function (chunk: Buffer) {
      const values = chunk
        .toString()
        .split(',')
        .map((value) => value.replace(/\n/, '').trim());
      if (this.isFirstChunk !== false) {
        this.headers = values.map((header) => {
          return HeadersEnum[header?.toLowerCase()] || null;
        });
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
