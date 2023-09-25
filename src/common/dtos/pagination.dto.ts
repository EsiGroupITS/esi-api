import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";


// Creamos Dto para paginación
export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( () => Number)
    //Transformar
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type( () => Number)
    offset?: number;
}