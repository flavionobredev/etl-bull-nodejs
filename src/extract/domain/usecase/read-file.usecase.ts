import { Readable } from "stream";

export interface ReadFileUseCase {
  readToCsv(file: Buffer): Readable | Promise<Readable> | any;
}
