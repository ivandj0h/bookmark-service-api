import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";

@Injectable()

export class AuthService {

    // Calling Prisma ORM Module
    constructor(private prisma: PrismaService) { }

    // Sign up Service
    async signUp(dto: AuthDto) {

        // Encrypting password
        const hash = await argon.hash(dto.password);

        // save user to database
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hash,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
            }
        })
        // return the saved user
        return user;
    }

    // Sign in Service
    signIn() {
        return { msg: "Sign in method" };
    }
}