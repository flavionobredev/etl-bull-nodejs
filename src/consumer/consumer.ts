import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Processor('new-import')
export class Consumer {
  @Process({
    concurrency: 10,
  })
  async job(job) {
    console.log('job', job.data);
    return {};
  }
}
