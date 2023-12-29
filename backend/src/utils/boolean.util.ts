import { ValueTransformer } from 'typeorm';

export function transformToBoolean(_default): ValueTransformer {
  const transformer = (value: any): any => {
    if (value === undefined) return _default;
    return !!value;
  };
  return {
    from: transformer,
    to: transformer,
  };
}
