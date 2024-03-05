import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class PostEmployeeDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    readonly phone: number;

    @IsNumber()
    @IsNotEmpty()
    readonly salary: number;

    @IsString()
    @IsNotEmpty()
    readonly region: string;
}