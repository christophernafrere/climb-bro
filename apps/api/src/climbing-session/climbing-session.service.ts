import {
    ClimbingLevel,
    ClimbingType,
    prisma,
    ClimbingSession,
} from "@climb-bro/db";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ClimbingSessionService {
    async createClimbingSession(
        name: string,
        type: ClimbingType,
        date: Date,
        message: string,
        requiredLevel: ClimbingLevel,
        maxClimbers: number,
        onlyForPartner: boolean,
        creatorId: string,
    ) {
        const newClimbingSession = prisma.climbingSession.create({
            data: {
                name,
                type,
                date,
                message,
                requiredLevel,
                maxClimbers,
                onlyForPartner,
                creatorId,
                climbers: {
                    connect: {
                        id: creatorId,
                    },
                },
            },
        });

        return newClimbingSession;
    }

    async getAllPublicClimbingSession() {
        const allClimbingSession = await prisma.climbingSession.findMany({
            where: {
                onlyForPartner: false,
            },
        });

        return allClimbingSession;
    }

    async getMyClimbingSessions(userId: string) {
        const allMyClimbingSession = await prisma.climbingSession.findMany({
            where: {
                climbers: {
                    some: {
                        id: userId,
                    },
                },
            },
        });

        return allMyClimbingSession;
    }

    async getPartnersSession(userId: string) {}

    async getClimbingSessionById(climbingSessionId: string) {
        const climbingSession = await prisma.climbingSession.findUnique({
            where: {
                id: climbingSessionId,
            },
        });

        return climbingSession;
    }

    async updateClimbingSession(
        climbingSessionId: string,
        updates: Partial<ClimbingSession>,
    ): Promise<ClimbingSession> {
        const updatedClimbingSession = await prisma.climbingSession.update({
            where: {
                id: climbingSessionId,
            },
            data: updates,
        });

        return updatedClimbingSession;
    }

    async addUserToClimbingSession(climbingSessionId: string, userId: string) {
        const updatedClimbingSession = await prisma.climbingSession.update({
            where: {
                id: climbingSessionId,
            },
            data: {
                climbers: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return updatedClimbingSession;
    }

    async deleteClimbingSession(climbingSessionId: string) {
        await prisma.climbingSession.delete({
            where: {
                id: climbingSessionId,
            },
        });
    }

    async getClimbingSessionHistory(userId: string) {
        const climbingSessionHistory = await prisma.climbingSession.findMany({
            where: {
                climbers: {
                    some: {
                        id: userId,
                    },
                },
                date: {
                    lt: new Date(),
                },
            },
        });

        return climbingSessionHistory;
    }

    async getAllIncomingClimbingSessions(userId: string) {
        const incomingClimbingSessions = await prisma.climbingSession.findMany({
            where: {
                climbers: {
                    some: {
                        id: userId,
                    },
                },
                date: {
                    gte: new Date(),
                },
            },
        });

        return incomingClimbingSessions;
    }
}
