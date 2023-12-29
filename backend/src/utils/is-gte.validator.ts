/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { gte } from 'lodash';
import * as dayjs from 'dayjs';
import { AnyObject } from './object.util';

// How to inject dependencies into your custom validator:
// https://stackoverflow.com/questions/60062318/how-to-inject-service-to-validator-constraint-interface-in-nestjs-using-class-va
// https://github.com/typestack/class-validator#using-service-container

interface IsGTEOptions<T> {
  property?: keyof T;
  date?: string;
}

export function IsGTE<T = any>(
  options?: IsGTEOptions<T>,
  validationOptions?: ValidationOptions,
) {
  return function (object: AnyObject, propertyName: string): void {
    const property = options?.property;
    const date = options?.date;
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property, date],
      validator: IsGTEValidator,
    });
  };
}

@ValidatorConstraint()
export class IsGTEValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    // in case both are present
    const otherValue = dayjs().toDate();
    return gte(value, otherValue);
  }

  defaultMessage(args?: ValidationArguments): string {
    const property = args.property;
    const otherProperty = args.constraints?.[0];
    const dateProperty = args.constraints?.[1];
    return `${property} must be greater than or equal to ${
      otherProperty || dayjs(dateProperty).format('YYYY-MM-DD')
    }`;
  }
}
