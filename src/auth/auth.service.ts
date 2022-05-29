import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()

export class AuthService {

    // Calling Prisma ORM & JWT Module
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    // Sign up Service
    async signUp(dto: AuthDto) {

        // Encrypting password
        const hash = await argon.hash(dto.password);

        try {
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

            // return the JWT Token
            return this.signToken(user.id, user.email);
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    throw new ForbiddenException("Email already exists"); // Email already exists
                }
            }
            throw err;
        }
    }

    // Sign in Service
    async signIn(dto: AuthDto) {

        // find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        // if user does not exist, throw Exception!
        if (!user) throw new ForbiddenException("Email or password is incorrect!");


        // if user exists, compare password
        const matchPassword = await argon.verify(
            await argon.hash(dto.password),
            dto.password,
        );

        // if password is incorrect, throw Exception!
        if (!matchPassword) throw new ForbiddenException("Email or password did not match!");

        // if password is correct, return user
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string,): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret,
            },
        );

        return {
            access_token: token,
        };
    }
}