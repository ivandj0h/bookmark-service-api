import { Injectable } from "@nestjs/common";


@Injectable({})

export class AuthService {

    // Sign up Service
    signUp(email: string, password: string) {
        return {
            email,
            password,
            message: "Sign up method",
        };
    }

    // Sign in Service
    signIn(email: string, password: string) {
        return {
            email,
            password,
            message: "Sign in method",
        };
    }
}