// collection.service.ts

import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';

@Injectable()
export class CollectionService {
  constructor(private readonly connection: Connection) {}

  async getAllCollections(): Promise<string[]> {
    const collections = await this.connection.db.listCollections().toArray();
    return collections.map((collection) => collection.name);
  }
}
