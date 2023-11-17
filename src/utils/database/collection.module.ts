import { Module } from '@nestjs/common';
import { CollectionService } from './collections.service';

@Module({
  providers: [CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}
