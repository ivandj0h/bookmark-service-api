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
        console.log({ dto })
        return this.authService.signUp();
    }

    // Sign in Controller
    @Post("/signin")
    signIn() {
        return this.authService.signIn();
    }
}