import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"


export class UserDto {

    @ApiProperty({ description: "Please enter your name"})
    @IsString()
    name? : string

    @ApiProperty({description: "please enter valid email"})
    @IsEmail()
    email: string
}

export class ParamDto {

    @ApiProperty({ description: "Please enter your id"})
    @IsString()
    id? : number

}