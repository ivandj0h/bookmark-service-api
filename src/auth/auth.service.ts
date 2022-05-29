import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()

export class AuthService {

    // Calling Prisma ORM Module
    constructor(private prisma: PrismaService) { }

    // Sign up Service
    signUp() {

        return { msg: "hello" };
    }

    // Sign in Service
    signIn() {
        return { msg: "Sign in method" };
    }
}