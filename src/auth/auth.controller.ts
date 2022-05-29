import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("/auth/v1")

export class AuthController {
    constructor(private authService: AuthService) {
    }

    // Sign up Controller
    @Post("/signup")
    signUp(@Body() dto: AuthDto) {

        return this.authService.signUp(dto);
    }

    // Sign in Controller
    @Post("/signin")
    signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto);
    }
}