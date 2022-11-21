import {
  Body,
  Controller,
  HttpCode,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Extract } from './extract';
import { createReadStream } from 'fs';
import { Writable } from 'stream';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response as Res } from 'express';

const HeadersEnum = {
  nome: 'name',
  email: 'email',
  'e-mail': 'email',
  telefone: 'phone',
  celular: 'phone',
  tags: 'tags',
  tag: 'tags',
  código: 'code',
  codigo: 'code',
};

const parseHeaders = (headers: string[]) => {
  return headers.map((header) => {
    return headers[header];
  });
};

const writeFn = function (chunk: Buffer, encoding, next) {
  const lines = chunk.toString().split('\n').filter(Boolean) as string[];
  if (Reflect.get(this, 'isFirstChunk') !== false) {
    Reflect.set(this, 'isFirstChunk', false);
    const headers = lines.shift().split(',').filter(Boolean);
    this.headers = headers.map((header) => {
      return HeadersEnum[header.toLowerCase()];
    });
  }
  console.log(this.headers);
  const formatted = lines.map((line) => {
    const values = line.split(',').filter(Boolean);
    const obj = {};
    this.headers.forEach((header, index) => {
      obj[header] = [null, undefined, ''].includes(values[index])
        ? null
        : values[index];
    });
    return obj;
  });
  // console.log(formatted);
  this.extractService.publish(formatted);
  next();
};

@Controller('extract')
export class ExtractController {
  private readonly writable: Writable;
  constructor(private readonly extractService: Extract) {
    this.writable = new Writable({
      write: writeFn.bind({ extractService }),
    });
  }

  @Post()
  @HttpCode(204)
  @UseInterceptors(FileInterceptor('file'))
  async publishExtract(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Response() response: Res,
  ) {
    response.status(204).send();
    console.log(file);
    this.extractService.read(file);
    // createReadStream(join(__dirname, '../../teste.csv')).pipe(this.writable);
  }
}
