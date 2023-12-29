import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { UUIDVersion } from 'class-validator/types/decorator/string/IsUUID';

@Injectable()
export class ParseEntityIdPipe implements PipeTransform<string, string> {
  constructor(private _version: UUIDVersion = '4') {}

  transform(id: string, metadata: ArgumentMetadata): string {
    if (!id || !isUUID(id, this._version)) {
      throw new BadRequestException(`${metadata.data} must be an UUID`);
    }
    return id;
  }
}
