import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClimbingLevel, ClimbingType } from "db";
import type { Response } from "express";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(201)
    @Post("sign-up")
    async signUp(
        @Body()
        body: {
            name: string;
            email: string;
            weight: number;
            password: string;
            preferedClimbingType: ClimbingType;
            climbingLevel: ClimbingLevel;
        },
    ) {
        const {
            name,
            email,
            weight,
            password,
            preferedClimbingType,
            climbingLevel,
        } = body;
        return this.authService.signUp(
            name,
            email,
            weight,
            password,
            preferedClimbingType,
            climbingLevel,
        );
    }

    @HttpCode(200)
    @Post("sign-in")
    async signIn(
        @Body()
        body: {
            email: string;
            password: string;
        },
        @Res({ passthrough: true }) response: Response,
    ) {
        const { email, password } = body;

        const token = await this.authService.signIn(email, password);

        // `signIn` retourne un objet { access_token: string }
        // il faut stocker la chaîne du token dans le cookie
        response.cookie("access_token", token.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return { success: true };
    }
    @UseGuards(AuthGuard)
    @Get("profile")
    async getProfile(@Req() request: any) {
        return request.user;
    }
}
