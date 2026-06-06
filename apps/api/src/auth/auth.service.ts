import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import { ClimbingLevel, ClimbingType } from "db";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(
        name: string,
        email: string,
        weight: number,
        password: string,
        preferedClimbingType: ClimbingType,
        climbingLevel: ClimbingLevel,
    ) {
        try {
            const existingUser = await this.userService.getUserByEmail(email);
            if (existingUser) {
                throw new Error("Email already in use");
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await this.userService.createUser(
                    name,
                    email,
                    weight,
                    hashedPassword,
                    preferedClimbingType,
                    climbingLevel,
                );
                return newUser;
            } catch (error) {
                throw new Error(
                    "Error hashing password: " +
                        (error instanceof Error
                            ? error.message
                            : String(error)),
                );
            }
        } catch (error) {
            throw new Error(
                "Error during sign up: " +
                    (error instanceof Error ? error.message : String(error)),
            );
        }
    }

    async signIn(email: string, password: string) {
        try {
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new Error("Invalid email or password");
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password,
            );
            if (!isPasswordValid) {
                throw new Error("Invalid email or password");
            }

            const payload = { userId: user.id, email: user.email };

            return {
                access_token: await this.jwtService.sign(payload),
            };
        } catch (error) {
            throw new Error(
                "Error during sign in: " +
                    (error instanceof Error ? error.message : String(error)),
            );
        }
    }
}
