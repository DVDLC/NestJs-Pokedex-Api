import { Transform } from "class-transformer"
import { IsOptional, IsPositive, Min } from "class-validator"

export class paginationDTO {

    @Transform(({ value }) => parseInt( value ) ) 
    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?: number

    @Transform(({ value }) => parseInt( value ) ) 
    @IsOptional()
    @Min(0)
    offset?: number
}