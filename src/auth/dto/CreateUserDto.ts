import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";


export class CreateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString() 
    password:string;

    
    @ApiProperty()
    @IsOptional()
    @IsString() 
    firstname:string;

    
    @ApiProperty()
    @IsOptional()
    @IsString() 
    lastname:string;
}