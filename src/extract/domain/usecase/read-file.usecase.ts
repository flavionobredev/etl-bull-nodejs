import { Readable } from "stream";

export interface ReadFileUseCase {
  read(file: Buffer): Readable | Promise<Readable> | any;
}
