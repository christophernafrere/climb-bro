import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClimbingLevel, ClimbingType } from "@climb-bro/db";
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
            sameSite: "none",
            maxAge: 15 * 60 * 1000, // 15 minutes
            domain: process.env.NODE_ENV === "production" ? "climb-bro.christopher-nafrere.fr" : undefined,
        });

        response.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
            domain: process.env.NODE_ENV === "production" ? "climb-bro.christopher-nafrere.fr" : undefined,
        });

        return { success: true };
    }

    @Get("me")
    @UseGuards(AuthGuard)
    async me(@Req() request: any) {
        return request.user;
    }

    @Post("refresh")
    async refreshToken(
        @Req() request: any,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = request.cookies["refresh_token"];
        if (!refreshToken) {
            throw new UnauthorizedException("No refresh token provided");
        }

        try {
            const { access_token, refresh_token } =
                await this.authService.refresh(refreshToken);
            response.cookie("access_token", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 15 * 60 * 1000, // 15 minutes
                domain: process.env.NODE_ENV === "production" ? "climb-bro.christopher-nafrere.fr" : undefined,
            });
            response.cookie("refresh_token", refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                domain: process.env.NODE_ENV === "production" ? "climb-bro.christopher-nafrere.fr" : undefined,
            });
            return { success: true };
        } catch (error) {
            throw new UnauthorizedException("Invalid refresh token");
        }
    }

    @UseGuards(AuthGuard)
    @Post("logout")
    async logout(
        @Req() request: any,
        @Res({ passthrough: true }) response: Response,
    ) {
        const userId = request.user?.id;

        await this.authService.logout(userId);

        response.clearCookie("access_token");
        response.clearCookie("refresh_token");

        return { success: true };
    }
}
