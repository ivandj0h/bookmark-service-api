import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("/auth/v1")

export class AuthController {
    constructor(private authService: AuthService) {
    }

    // Sign up Controller
    @Post("/signup")
    signUp() {
        return "Sign up Controller";
    }

    // Sign in Controller
    @Post("/signin")
    signIn() {
        return "Sign in Controller";
    }
}