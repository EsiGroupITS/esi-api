import { RoleEnum } from './role-enum/role-enum';
export declare const ROLES_KEY = "roles";
export declare const Role: (...roles: RoleEnum[]) => import("@nestjs/common").CustomDecorator<string>;
