import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiKey } from '../entities/apikey.entity';

@Injectable()
export class ApiKeyService implements OnApplicationBootstrap {
  constructor(@InjectModel(ApiKey.name) private apikeyModel: Model<ApiKey>) {}
  async onApplicationBootstrap() {
    const foundKey = await this.apikeyModel.find();
    if (!foundKey.length) {
      console.log('no key found');
      const new_key = new this.apikeyModel();
      new_key.key = 'test-key-shdrjjidrk';
      await new_key.save();
    }
  }

  // constructor() {} // @InjectModel(ApiKey.name) private apikeyModel: Model<ApiKey>
  isKeyValid(key: string) {
    // if (!keyFound) {    // const keyFound = this.apikeyModel.findOne({ key });

    //   return false;
    // }
    return true;
  }
}
