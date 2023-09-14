import { UserEntity } from "src/users/user-entity/user-entity";
export declare class ConfigEntity {
    id: string;
    contrast_black: boolean;
    text_size: boolean;
    text_spacing: boolean;
    high_visibility: boolean;
    fontDyslexic: boolean;
    user: UserEntity[];
}
