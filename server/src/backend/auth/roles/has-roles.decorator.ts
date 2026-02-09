import { SetMetadata } from '@nestjs/common';

export enum RoleEnum {
    'banner' = 'Banner',
    'book' = 'Book',
    'faq' = 'Faq',
    'low' = 'Low',
    'link' = 'Link',
    'news' = 'News',
    'exhibit' = 'Exhibit',
    'navigation' = 'Navigation',
    'download' = 'Download',
    'game' = 'Game',
}

export const HasRoles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);

