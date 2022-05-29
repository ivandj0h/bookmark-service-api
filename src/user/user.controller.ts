import {
    Body,
    Controller,
    Get,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users/v1')
export class UserController {
    constructor(private userService: UserService) { }
    @Get('/profile')
    getMe(@GetUser() user: User) {

        const { id, email, firstName, lastName, createdAt, updatedAt } = user;

        return {
            id,
            data: {
                email,
                firstName,
                lastName,
            },
            createdAt,
            updatedAt,
        };
    }

    @Patch()
    editUser(
        @GetUser('id') userId: number,
        @Body() dto: EditUserDto,
    ) {
        return this.userService.editUser(userId, dto);
    }
}