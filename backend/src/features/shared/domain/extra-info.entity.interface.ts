import { ExtraInfo } from './extra-info.entity';

export interface EntityWithExtraInfo {
  extraInfo: ExtraInfo;
}

export interface IExtraInfo {
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
