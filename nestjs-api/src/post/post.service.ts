import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dtos/post.dto';



@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async createPost(postDto: PostDto) {
        return this.prismaService.post.create({
            data: {
                title: postDto.title,
                content: postDto.content,
                authorId: +postDto.authorId

            }
        })
    }

    async getPostById(id: number) {
        return this.prismaService.post.findUnique({
            where: {
                id
            }
        });
    }
    
    async getPostList(pageSize: number, skip: number) {
        const totalCount = await this.prismaService.post.count(); // Get total count of posts
        const totalPages = Math.ceil(totalCount / pageSize); // Calculate total number of pages
        const posts = await this.prismaService.post.findMany({
            take: pageSize,
            skip,
            orderBy: {
                createdAt: 'desc'
            } as any // Casting to 'any' to bypass type checking
        });
        return {
            posts,
            totalPages
        };
    }

    async deletePost(postId: number) {
        return this.prismaService.post.delete({
            where: {
                id: postId
            }
        });
    }
}
