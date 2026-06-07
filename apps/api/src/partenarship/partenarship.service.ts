import { Injectable } from "@nestjs/common";
import { prisma } from "db";

@Injectable()
export class PartenarshipService {
    async addClimbingPartenar(userId: string, partnerId: string) {
        const updatedUser = await prisma.climberPartenarship.create({
            data: {
                id: userId,
                initiator: {
                    connect: {
                        id: userId,
                    },
                },
                receiver: {
                    connect: {
                        id: partnerId,
                    },
                },
            },
        });
        return updatedUser;
    }

    async removeClimbingPartenar(userId: string, partnerId: string) {
        const updatedUserForInitiator = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                initiedPartnerships: {
                    disconnect: {
                        id: partnerId,
                    },
                },
            },
        });

        const updatedUserForReceptor = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                receivedPartnerships: {
                    disconnect: {
                        id: partnerId,
                    },
                },
            },
        });

        return { updatedUserForInitiator, updatedUserForReceptor };
    }

    async getClimbingPartenars(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                initiedPartnerships: {
                    include: {
                        receiver: {
                            select: {
                                name: true,
                                climbingLevel: true,
                                preferedClimbingType: true,
                                isEnabled: true,
                            },
                        },
                    },
                },
                receivedPartnerships: {
                    include: {
                        initiator: {
                            select: {
                                name: true,
                                climbingLevel: true,
                                preferedClimbingType: true,
                                isEnabled: true,
                            },
                        },
                    },
                },
            },
        });
        return [
            ...(user?.initiedPartnerships ?? []),
            ...(user?.receivedPartnerships ?? []),
        ];
    }
}
