// pagination.helper.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class PaginationHelper {
  // constructor(private executionContext: ExecutionContext) {}
  async paginate(
    model: Model<any>,
    query: object,
    queryParams: PaginationDto,
    select = 'name',
  ) {
    const { page, limit, populate } = queryParams;
    const _page = page || 1;
    const _limit = limit || 10;
    const paths: string = populate ? populate.split(',').join(' ') : '';

    const skip = (_page - 1) * _limit;

    const findQuery = model
      .find(query)
      .populate({
        path: paths,
        strictPopulate: false,
        select: select,
      })
      .skip(skip)
      .limit(limit);

    const data = await findQuery.exec();
    const totalItems = await model.countDocuments(query).exec();

    return {
      data,
      metadata: {
        total: totalItems,
        page: _page,
        total_pages: Math.ceil(totalItems / _limit),
        per_page: _limit,
        // links: {
        //   self: '',
        //   next: '',
        //   previous: '',
        //   first: '',
        //   last: '',
        // },
      },
    };
  }
}
