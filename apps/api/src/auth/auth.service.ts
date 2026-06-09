import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import { ClimbingLevel, ClimbingType } from "@climb-bro/db";
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

            const access_token = this.jwtService.sign(payload, {
                expiresIn: "15m",
            });

            const refresh_token = this.jwtService.sign(payload, {
                expiresIn: "30d",
            });

            await this.userService.updateRefreshToken(user.id, refresh_token);

            return {
                access_token,
                refresh_token,
            };
        } catch (error) {
            throw new Error(
                "Error during sign in: " +
                    (error instanceof Error ? error.message : String(error)),
            );
        }
    }

    async refresh(userId: string, refresh_token: string) {
        const payload = this.jwtService.verify(refresh_token);

        const user = await this.userService.getUserById(userId);
        if (!user || !user.refreshToken) {
            throw new Error("Invalid refresh token");
        }

        const match = await bcrypt.compare(refresh_token, user.refreshToken);
        if (!match) {
            throw new Error("Invalid refresh token");
        }

        const access_token = this.jwtService.sign(payload, {
            expiresIn: "15m",
        });

        const new_refresh_token = this.jwtService.sign(payload, {
            expiresIn: "30d",
        });

        await this.userService.updateRefreshToken(userId, new_refresh_token);

        return { access_token, refresh_token: new_refresh_token };
    }

    async logout(userId: string) {
        await this.userService.updateRefreshToken(userId, null);
    }
}
