import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = "isPublic";
export const IsPublic = (...args: string[]) => SetMetadata(IS_PUBLIC_KEY, true);
