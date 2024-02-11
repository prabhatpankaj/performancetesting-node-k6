import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async createUser(userDto: UserDto) {
        return this.prismaService.user.create({
            data: userDto
        })
    }

    async getUserPosts(id: number) {
        return this.prismaService.user.findMany(
            {
                where: {
                    id: id
                },  
                include: {
                    posts: true
                } 
            }
        )
    }

    async deleteUser(userId: number) {
        return this.prismaService.user.delete({
            where: {
                id: userId
            }
        });
    }
}
