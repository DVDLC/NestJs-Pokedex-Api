import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // console.log({ value, metadata })

    if( !isValidObjectId( value ) ) throw new BadRequestException( 'Not valid mongoID' )
    return value;
  }
}
