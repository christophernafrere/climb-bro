import { Injectable } from "@nestjs/common";
import { prisma, ClimbingType, ClimbingLevel } from "@climb-bro/db";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
    async createUser(
        name: string,
        email: string,
        weight: number,
        password: string,
        preferedClimbingType: ClimbingType,
        climbingLevel: ClimbingLevel,
    ) {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                weight,
                password,
                preferedClimbingType,
                climbingLevel,
            },
        });
        return user;
    }

    async getUserByEmail(email: string) {
        if (!email) return null;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }

    async getUserById(id: string) {
        if (!id) return null;

        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                weight: true,
                preferedClimbingType: true,
                climbingLevel: true,
                createdAt: true,
                imageUrl: true,
                _count: {
                    select: {
                        initiedPartnerships: true,
                        receivedPartnerships: true,
                    },
                },
                refreshToken: true,
            },
        });

        return user;
    }

    async updatePassword(userId: string, newPassword: string) {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                password: newPassword,
            },
        });
        return updatedUser;
    }

    async updateRefreshToken(userId: string, refreshToken: string | null) {
        const hashedRefreshToken = refreshToken
            ? await bcrypt.hash(refreshToken, 10)
            : null;

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: hashedRefreshToken,
            },
        });

        return updatedUser;
    }
}
