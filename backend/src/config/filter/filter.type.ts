import { HttpStatus } from '@nestjs/common';
import { AnyObject } from '../../utils/object.util';

export interface JsonResponse {
  statusCode: HttpStatus;
  timestamp: string;
  method: string;
  path: string;
  message: string | AnyObject;
  error?: string;
}
