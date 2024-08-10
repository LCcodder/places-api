import { HttpException, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const resolveMongoId = (id: string): mongoose.Types.ObjectId => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    throw new HttpException('ID is wrong format', HttpStatus.NOT_FOUND);
  }
};
