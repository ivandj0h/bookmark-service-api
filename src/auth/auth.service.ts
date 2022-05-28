import { Injectable } from "@nestjs/common";


@Injectable({})

export class AuthService {

    // Sign up Service
    signUp(email: string, password: string) {
        return "Sign up method";
    }

    // Sign in Service
    signIn(email: string, password: string) {
        return "Sign in method";
    }
}