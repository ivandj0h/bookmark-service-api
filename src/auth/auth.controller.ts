import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("/auth/v1")

export class AuthController {
    constructor(private authService: AuthService) {
    }

    // Sign up Controller
    @HttpCode(HttpStatus.CREATED)
    @Post("/signup")
    signUp(@Body() dto: AuthDto) {

        return this.authService.signUp(dto);
    }

    // Sign in Controller
    @HttpCode(HttpStatus.OK)
    @Post("/signin")
    signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto);
    }
}