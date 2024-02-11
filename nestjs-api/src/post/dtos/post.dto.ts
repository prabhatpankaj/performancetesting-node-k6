import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class PostDto {

    @ApiProperty({ description: "Please enter your title"})
    @IsString()
    title : string

    @ApiProperty({ description: "Please enter your content"})
    @IsString()
    content?: string

    @ApiProperty({ description: "Please enter your author"})
    @IsNumber()
    authorId: number

}