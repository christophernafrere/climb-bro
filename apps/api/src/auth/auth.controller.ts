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

        const { access_token, refresh_token } = await this.authService.signIn(
            email,
            password,
        );

        // `signIn` retourne un objet { access_token: string }
        // il faut stocker la chaîne du token dans le cookie
        response.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        response.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
        });

        return { success: true };
    }

    @Post("refresh")
    async refreshToken(
        @Req() request: any,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = request.cookies["refresh_token"];
        if (!refreshToken) {
            return { success: false, message: "No refresh token provided" };
        }

        try {
            const userId = request.user?.userId;
            const { access_token, refresh_token } =
                await this.authService.refresh(userId, refreshToken);
            response.cookie("access_token", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 15 * 60 * 1000, // 15 minutes
            });
            response.cookie("refresh_token", refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
        } catch (error) {
            return { success: false, message: "Invalid refresh token" };
        }
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    async getProfile(@Req() request: any) {
        return request.user;
    }

    @UseGuards(AuthGuard)
    @Post("logout")
    async logout(
        @Req() request: any,
        @Res({ passthrough: true }) response: Response,
    ) {
        const userId = request.user?.userId;

        await this.authService.logout(userId);

        response.clearCookie("access_token");
        response.clearCookie("refresh_token");

        return { success: true };
    }
}
