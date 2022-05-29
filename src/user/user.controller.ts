import { Controller, Get } from '@nestjs/common';

@Controller('users/v1/')
export class UserController {

    @Get("profile")
    getProfile() {
        return { data: "User Profile" };
    }

}
