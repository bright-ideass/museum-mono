import { Controller, Get, Req, Res, HttpStatus, Post, Body, Delete, Param,UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { ICM_A_Book } from 'src/entities/ICM_A_Book';
import { HasRoles, RoleEnum } from 'src/backend/auth/roles/has-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/backend/auth/roles/roles.guard';
@HasRoles(RoleEnum.book)
@UseGuards(AuthGuard('backend'), RolesGuard)
@Controller('backend/book')
export class BookController {
    constructor(
        private bookService: BookService
    ) { }

    @Get('list')
    async findAll(@Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.bookService.findAll())
    }

    @Get('read/:id')
    async findOne(@Res() res: any, @Req() req: any, @Param('id') id: number) {
        return res.status(HttpStatus.OK).json(await this.bookService.findOne(id))
    }

    @Post('create')
    async createOne(@Body() body: ICM_A_Book, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.bookService.saveOne(body))
    }

    @Post('update')
    async updateOne(@Body() body: ICM_A_Book, @Res() res: any, @Req() req: any,) {
        body.UpdatedTime = new Date();
        return res.status(HttpStatus.OK).json(await this.bookService.saveOne(body))
    }

    @Post('sort')
    async sort(@Res() res: any, @Body() body: ICM_A_Book[]) {
        return res.status(HttpStatus.OK).json(await this.bookService.sort(body));
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number, @Res() res: any, @Req() req: any,) {
        return res.status(HttpStatus.OK).json(await this.bookService.remove(id))
    }

}
