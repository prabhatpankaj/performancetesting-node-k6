
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dtos/post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post("/create-post")
    createPost(
        @Body() postDto: PostDto
    ) {
        try {
            return this.postService.createPost(postDto)
        } catch (error){
            throw error
        }

    }

    @Get(':id')
    async getPostById(@Param('id') id: string) {
        try {
            return this.postService.getPostById(+id);
        } catch (error){
            throw error
        }
    }

    @Get()
    async getPostList(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string
    ) {
        try {
            const pageNumber = parseInt(page, 10); // Parse string to number
            const pageSizeNumber = parseInt(pageSize, 10); // Parse string to number
            const skip = (pageNumber - 1) * pageSizeNumber; // Calculate skip value

            const { posts, totalPages } = await this.postService.getPostList(pageSizeNumber, skip);
            return {
                posts,
                totalPages
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return this.postService.deletePost(+id);
    }
    
}

