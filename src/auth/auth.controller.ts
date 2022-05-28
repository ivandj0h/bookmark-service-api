import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("/auth/v1")

export class AuthController {
    constructor(private authService: AuthService) {
    }

    // Sign up Controller
    @Post("/signup")
    signUp() {
        return this.authService.signUp("juna@gmai.com", "123456");
    }

    // Sign in Controller
    @Post("/signin")
    signIn() {
        return this.authService.signIn("dave@gmail.com", "123456");
    }
}