import { AppException } from './shared.exception';

export class RegisterAlreadyExistsException extends AppException {
  constructor(message) {
    super(message);
  }
}

export class RegisterNotFound extends AppException {
  constructor() {
    super('Register not found');
  }
}
