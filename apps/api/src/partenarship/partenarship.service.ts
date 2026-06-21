import { Injectable } from "@nestjs/common";
import { Prisma, prisma } from "@climb-bro/db";

@Injectable()
export class PartenarshipService {
    async addClimbingPartenar(userId: string, partnerId: string) {
        try {
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
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new Error("uniconstraint violation");
            }

            throw error;
        }
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

    async checkClimbingPartenar(userId: string, partnerId: string) {
        const partnership = await prisma.climberPartenarship.findFirst({
            where: {
                AND: [
                    {
                        OR: [
                            {
                                initiatorId: userId,
                                receptorId: partnerId,
                            },
                            {
                                initiatorId: partnerId,
                                receptorId: userId,
                            },
                        ],
                    },
                    {
                        isAccepted: true,
                    },
                ],
            },
        });

        return !!partnership;
    }
}
